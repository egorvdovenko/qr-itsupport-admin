import BaseController from '@/api/controllers/Base.controller.js'

class FilesController extends BaseController {
  static prefix = '/api/Files';

  uploadFile (file) {
    const formData = new FormData()

    formData.append('file', file)

    return this.axios({
      method: 'post',
      data: formData,
      url: `${FilesController.prefix}`
    })
  }
}

export default FilesController
