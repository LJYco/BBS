export function game(req, res, next) {
  res.render('game.html')
}
export function bird(req, res, next) {
  res.render('game_bird.html', {
    username: req.cookies.username
  })
}