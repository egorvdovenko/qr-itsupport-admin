export default class FileService {
  static fileToBase64 (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onloadend = function () {
        // The result property contains the base64 string
        const base64String = reader.result
        resolve(base64String)
      }

      reader.onerror = function (error) {
        reject(error)
      }

      // Read the file as a data URL, which will give you a base64 representation
      reader.readAsDataURL(file)
    })
  }
}
