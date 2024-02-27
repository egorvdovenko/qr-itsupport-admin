import BaseController from '@/api/controllers/Base.controller.js'

class DocumentsController extends BaseController {
  static prefix = '/api/documents';

  getDocuments (payload) {
    return this.axios({
      method: 'get',
      url: `${DocumentsController.prefix}`,
      params: payload
    })
  }

  getDocument (id) {
    return this.axios({
      method: 'get',
      url: `${DocumentsController.prefix}/${id}`
    })
  }

  createDocument (payload) {
    return this.axios({
      method: 'post',
      data: payload,
      url: `${DocumentsController.prefix}`
    })
  }

  saveDocument (payload) {
    const { id } = payload

    return this.axios({
      method: 'put',
      data: payload,
      url: `${DocumentsController.prefix}/${id}`
    })
  }

  deleteDocument (id) {
    return this.axios({
      method: 'delete',
      url: `${DocumentsController.prefix}/${id}`
    })
  }
}

export default DocumentsController
