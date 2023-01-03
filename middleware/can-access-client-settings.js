export default function ({ route, error, $_auth }) {
  if ($_auth().user.project.role !== 'client') {
    error({
      statusCode: 401,
      path: route.path,
      message: 'You are not authorized to access this page.',
    })
  }
}
