async function boss_check_middleware(req, res, next) {
  try {
    const { userType } = res.locals.user;

    if (userType !== 1) {
      return res.status(403).send({ message: "권한 없음." });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: error.message });
  }
}

module.exports = { boss_check_middleware };
