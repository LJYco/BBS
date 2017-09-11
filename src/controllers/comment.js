import Comment from '../models/comment'

export function list(req, res, next) {
    const articleId = req.params.articleId;
    Comment.findAllByArticleId(articleId, (err, docs) => {
        if (err) {
            throw err
        }
        res.json({
            status: 'OK',
            result: {
                comments: docs
            }
        })
    })
}

export function create(req, res, next) {
    const body = req.body;
    const articleId = req.params.articleId
    const comment = new Comment({
        message: body.message,
        author_id: req.session.user_id,
        article_id: articleId
    })
    comment.save((err, result) => {
        if (err) {
            throw err
        }
        res.json({
            status: 'OK',
            result: ''
        })
    })
}