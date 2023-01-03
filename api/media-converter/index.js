// const fs = require('fs')
// const ffmpeg = require('fluent-ffmpeg')
const express = require('express')
const app = express()
const cors = require('cors')
// const { v4: uuidv4 } = require('uuid')
// const Sharp = require('sharp')
// const axios = require('axios')
const Jimp = require('jimp')

// const SUPPORTED_SHARP_TYPES = [
//   'jpg',
//   'jpeg',
//   'png',
//   'webp',
//   'gif',
//   'jp2',
//   'tif',
//   'tiff',
//   'avif',
//   'heif',
// ]

app.use(
  cors({
    origin: '*',
    exposedHeaders: 'ETAG',
    allowedHeaders: '*',
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// function convert(source, fileType, format, res) {
//   // eslint-disable-next-line node/no-path-concat
//   const destination = __dirname + '/' + uuidv4() + '.' + format
//   try {
//     if (['fla', 'flv', 'f4v', 'f4p', 'f4a', 'f4b'].includes(format)) {
//       ffmpeg(source)
//         .preset('flashvideo')
//         .on('close', () => {})
//         .on('end', () => {})
//         .on('exit', () => {})
//         .on('error', function (err) {
//           console.error('an error happened: ' + err.message)
//           try {
//             res.status(500).send(err.message)
//           } catch (e) {
//             console.error(e)
//           }
//         })
//         .pipe(res)
//     } else {
//       ffmpeg(source)
//         .format(format)
//         .on('close', () => {})
//         .on('end', () => {
//           res.download(destination, null, (e) => {
//             if (e) console.log('download error', e)
//             try {
//               fs.unlinkSync(destination)
//             } catch (ee) {
//               console.error(ee)
//             }
//           })
//         })
//         .on('exit', () => {})
//         .on('error', (e) => {
//           console.error(e.message)
//           try {
//             res.status(500).send(e)
//           } catch (e1) {
//             console.error(e1)
//           }
//         })
//         .save(destination)
//     }
//   } catch (e) {
//     try {
//       res.status(500).send(e)
//     } catch (ee) {
//       console.log(ee)
//     }
//   }
// }

// function fromSvg(inputBuffer, format) {
//   if (!SUPPORTED_SHARP_TYPES.includes(format)) {
//     throw new Error('Unsupported type ' + format)
//   }
//   return new Promise((resolve, reject) => {
//     Sharp(inputBuffer)
//       // .resize({width:400})
//       .toFormat(format)
//       .toBuffer((err, data, info) => {
//         if (err) {
//           return reject(err)
//         }
//         resolve(data)
//       })
//   })
// }

// eslint-disable-next-line no-unused-vars
function toSvg(format) {
  // todo
}

// app.post('/', async (req, res) => {
//   const { url, fileType, format } = req.body
//   if (!url || !format || !fileType) {
//     return res.status(400).send('url|fileType|targetFormat missing')
//   }
//   if (['audio', 'video'].includes(fileType)) {
//     return convert(url, fileType, format, res)
//   }
//   if (fileType !== 'image') {
//     return res.status(400).send('Unknown file type')
//   }
//   try {
//     const { data } = await axios({
//       url,
//       responseType: 'arraybuffer',
//     })
//     // if(headers['content-type'] !== 'image.svg+xml'){
//     //   return
//     // }
//     fromSvg(data, format)
//       .then((buffer) => {
//         res.send(buffer)
//       })
//       .catch((e) => res.status(500).send(e.message))
//   } catch (e) {
//     res.status(500).send(e.message)
//   }
// })
app.post('/resolution', (req, res) => {
  const { w, h, s, q, m } = req.body
  if (!w || isNaN(parseInt(w)))
    return res.status(400).send('w required, must be number')
  if (!h || isNaN(parseInt(w)))
    return res.status(400).send('h required, must be number')
  if (!s) return res.status(400).send('Source parameter required!')
  if (!q) return res.status(400).send('Quality parameter required!')
  try {
    Jimp.read(s, (err, image) => {
      if (err) {
        console.error(err)
        console.error(err.message)
        console.error(Object.keys(err))
        return res.status(500).send(err)
      }
      const mime = m || image._originalMime
      image
        .resize(w, h)
        .quality(q)
        .getBuffer(mime, (buffErr, buffer) => {
          if (buffErr) {
            console.error(buffErr)
            console.error(buffErr.message)
            console.error(Object.keys(buffErr))
            return res.status(500).send(buffErr)
          }
          res.header('ext', image.getExtension())
          res.send(buffer)
        })
    })
  } catch (e) {
    console.error(e)
    console.error(e.message)
    console.error(Object.keys(e))
    res.status(500).send(e)
  }
})

module.exports = {
  path: '/convert',
  handler: app,
}
