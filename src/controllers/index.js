import Article from '../models/article'
import moment from 'moment'
moment.locale('zh-cn')
export function showIndex(req, res, next) {
    let pageNumber = parseInt(req.params.pageNumber) || 1;
    Article.count((err, count) => {
        if (err) {
            throw err
        }
        const totalPage = Math.ceil(count / 6);
        if (pageNumber < 1) {
            pageNumber = 1;
        }
        if (pageNumber > totalPage) {
            pageNumber = totalPage;
        }
        Article.findAll(pageNumber, 6, (err, articles) => {
            if (err) {
                throw err
            }
            articles.forEach(a => a.create_time = moment(a.create_time).startOf('second').fromNow());
            res.render('index.html', {
                user: req.session.user,
                articles: articles,
                totalPage: totalPage,
                pageNumber: pageNumber
            })
        })
    })
}