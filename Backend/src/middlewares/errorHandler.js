const errorHandler = (err, res) => {
  const statusCode = res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
  })
}

const ResourceNotFound = (req, res) => {
  res.status(404).json({
    statusCode: 404,
    error: 'Not Found',
  })
}

module.exports = { errorHandler, ResourceNotFound }
