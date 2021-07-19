import { Server } from 'socket.io';

var users = {};
var rooms = {};
var answers = [];

export const socketConfig = (httpServer) => new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

export function events(io) {
    io.on("connection", socket => {
        socket.on('saudacoes', (data) => {
            if(!users[data.user_id]) {    
                users[socket.id] = data.user_id;
            }
        });

        socket.on("disconnect", () => {
            if(users[socket.id]) {
                delete users[socket.id];
            }
        });

        socket.on('create-new-room', (data) => {
            rooms[data.room_name] = {
                quiz_id: data.quiz_id,
                totalReady: 0,
                totalAnswers: 0,
                users: [{
                    user_id: data.user_id,
                    name: data.name,
                    user_photo: data.user_photo,
                    score: 0,
                    ready: false,
                    answered: false
                }]
            };

            socket.join(data.room_name);
        });

        socket.on('join-quiz-room', (data) => {
            if(rooms[data.room_name]) {
                let user = {
                    user_id: data.user_id,
                    name: data.name,
                    user_photo: data.user_photo,
                    score: 0,
                    ready: false,
                    answered: false
                }

                rooms[data.room_name].users.push(user);
        
                socket.join(data.room_name);
        
                socket.emit('room-quiz-id', {
                    quiz_id: rooms[data.room_name].quiz_id,
                    participants: rooms[data.room_name].users
                });

                socket.to(data.room_name).emit('new-participant', {
                    user
                });
            } else {
                console.log('Sala não existe!');
            }
        });

        socket.on('get-participants', (data) => {
            if(rooms[data.room_name]) {
                socket.emit('participant-list', {
                    participants: rooms[data.room_name].users
                });
            }
        });

        socket.on('participant-left', (data) => {
            if(rooms[data.room_name]) {
                let tempUsers = rooms[data.room_name].users;
                tempUsers = tempUsers.filter(user => user.user_id !== data.user_id);
        
                rooms[data.room_name].users = tempUsers;
        
                socket.to(data.room_name).emit('remove-participant', {
                    user_id: data.user_id
                });
            }
        });

        socket.on('participant-ready', (data) => {
            if(rooms[data.room_name]) {
                let participants = rooms[data.room_name].users.map(participant => {
                    if(participant.user_id === data.user_id) {
                        participant.ready = true;
                        rooms[data.room_name].totalReady += 1;
                    }

                    return participant;
                });

                io.in(data.room_name).emit('users-answers-list', {
                    participants
                });

                if(rooms[data.room_name].totalReady === rooms[data.room_name].users.length) {
                    io.in(data.room_name).emit('quiz-start');
                }
            }
        });

        socket.on('participant-answer', (data) => {
            if(rooms[data.room_name]) {
                rooms[data.room_name].totalAnswers += 1;

                let participants = rooms[data.room_name].users.map(participant => {
                    if(participant.user_id === data.user_id) {
                        participant.answered = true;

                        if(data.is_correct) {
                            participant.score = participant.score + 1;
                        }
                    }

                    return participant;
                });

                io.in(data.room_name).emit('score-update', {
                    participants
                });
            }
        });

        socket.on('check-answers', (data) => {
            if(rooms[data.room_name]) {
                if(rooms[data.room_name].totalAnswers === rooms[data.room_name].users.length) {
                    let participants = rooms[data.room_name].users.map(participant => {
                        participant.answered = false;

                        return participant;
                    });

                    io.in(data.room_name).emit('all-answered', {
                        participants
                    });
                    
                    io.in(data.room_name).emit('to-next-question');

                    rooms[data.room_name].totalAnswers = 0;
                }
            }
        });
    });
}
