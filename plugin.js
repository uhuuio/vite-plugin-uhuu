const plugin = function(){
    const makeZip = function (output, fileName = 'dist.zip') {
        const path = require('path')
        const fs = require('fs')
        const JSZip = require('jszip');
        const zip = new JSZip()
        const distPath = path.resolve(output)
        const readDir = function (zip, dirPath) {
            const files = fs.readdirSync(dirPath);
            files.forEach(fileName => {
                const fillPath = path.join(dirPath, "./", fileName)
                const file = fs.statSync(fillPath);
                if (file.isDirectory()) {
                    const dirZip = zip.folder(fileName);
                    readDir(dirZip, fillPath);
                } else {
                    zip.file(fileName, fs.readFileSync(fillPath))
                }
            });
        }
        const removeExistedZip = () => {
            const dest = path.join(distPath, './' + fileName)
            if (fs.existsSync(dest)) {
                fs.unlinkSync(dest)
            }
        }
        const zipDir = function () {
            readDir(zip, distPath);
            zip.generateAsync({
                type: "nodebuffer",
                compression: "DEFLATE",
                compressionOptions: {
                    level: 9
                }
            }).then(content => {
                const dest = path.join(distPath, './' + fileName)
                removeExistedZip()
                fs.writeFileSync(dest, content);
            });
        }
        removeExistedZip()
        zipDir(distPath)
    }
    return {
        name: 'vite-plugin-uhuu',
        apply: 'build',
        closeBundle(){
            const path = require('path')
            const realPath = path.resolve(__dirname,'../../dist')
            const name = 'uhuu.zip'
            makeZip(realPath,name)
        }
    }
}
module.exports = plugin
