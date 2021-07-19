export default function errorConfig (error, req, res, next) {
    if(error && error.status) {
        res.status(error.status).json({
            error: error.message,
            status: error.status
        });
    } else {
        console.log(error);
        return res.status(500).json({ 
            error: "Try again later!", 
            status: 500 
        });
    }
}