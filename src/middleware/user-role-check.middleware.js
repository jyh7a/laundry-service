async function boss_check_middleware(req, res, next) {
  try {
    const { userType } = res.locals.user;

    if (userType !== 1) {
      return res.status(403).render("error");
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: error.message });
  }
}

async function customer_check_middleware(req, res, next) {
  try {
    const { userType } = res.locals.user;

    if (userType !== 0) {
      return res.status(403).render("error");
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: error.message });
  }
}

module.exports = { boss_check_middleware, customer_check_middleware };
