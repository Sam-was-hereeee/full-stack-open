const logger = require('./logger')
const jwt = require("jsonwebtoken");
const {response} = require("express");

const unknownEndpoint = (_req, res) => {
    res.status(404).send({ error: 'No such entry with this endpoint' })
}

const errorHandler = (err, req, res, next) => {
    console.log('handling error:', err)
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'Invalid id format' })
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({ err })
    }
    next(err)
}

const tokenExtractor = (req, res, next) => {
    logger.info('got token')
    const auth = req.get('authorization');
    logger.info(auth)
    if (auth && auth.startsWith('Bearer ')) {
        req['token'] = auth.replace('Bearer ', '');
    }
    logger.info('processed token')
    next()
}

const userExtractor = (req, res, next) => {
    const decodedToken = (()=>{
        try{
            return jwt.verify(req.token, process.env.SECRET)
        } catch {
            return null
        }
    })()
    if (!decodedToken || !decodedToken.id) {
        return res.status(401).json({error: "invalid token"})
    }
    req.user = decodedToken
    next()
}

module.exports = {
    errorHandler, unknownEndpoint, tokenExtractor, userExtractor
}