import { io } from 'socket.io-client';

export const socket = io('http://localhost:3333');

const events = {
    welcome(user_id) {
        socket.emit('saudacoes', {
            user_id
        });
    },

    onAllRooms(setRooms) {
        socket.on('all-rooms', (data) => {
            setRooms(data.rooms)
        });
    },

    answer(answerData) {
        socket.emit('participant-answer', answerData);
    },

    participantLeft(participantData) {
        socket.emit('participant-left', participantData);
    }, 

    newRoom(roomInfo) {
        socket.emit('create-new-room', roomInfo);
    },

    joinRoom(joinData) {
        socket.emit('join-quiz-room', joinData);
    },

    onQuizId(setQuizId) {
        socket.on('room-quiz-id', (data) => {
            setQuizId(data.quiz_id);
        });
    },

    getParticipants(room_name) {
        socket.emit('get-participants', {
            room_name
        });
    },

    onNewParticipant(participants, setParticipants) {
        socket.on('new-participant', (data) => {
            setParticipants([...participants, data.user]);;
        });
    },

    onRemoveParticipant(participants, setParticipants) {
        socket.on('remove-participant', (data) => {
            setParticipants(participants.filter(participant => participant.user_id !== data.user_id));
        });
    },

    onScoreUpdate(setParticipants) {
        socket.on('score-update', (data) => {
            setParticipants(data.participants);
        });
    },

    onParticipantList(setParticipants) {
        socket.on('participant-list', (data) => {
            setParticipants(data.participants)
        });
    },

    participantReady(data) {
        socket.emit('participant-ready', data);
    },

    onUsersAnswersList(setParticipants) {
        socket.on('users-answers-list', (data) => {
            setParticipants(data.participants);
        });
    },

    onQuizStart(setStart) {
        socket.on('quiz-start', () => {
            setStart(true);
        });
    },

    checkAnswers(room_name) {
        socket.emit('check-answers', {
            room_name
        });
    },

    onAllAnswered(setParticipants) {
        socket.on('all-answered', (data) => {
            setParticipants(data.participants);
        });
    },

    onToNextQuestion(setCheckToNextQuestion) {
        socket.on('to-next-question', () => {
            setCheckToNextQuestion(true);
        });
    }
}

export default events;