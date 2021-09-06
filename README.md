<!--
 * @Description: 
 * @Version: 1.00
 * @Autor: songTeng
 * @Date: 2021-08-24 14:12:16
 * @LastEditors: songTeng
 * @LastEditTime: 2021-09-06 14:42:24
-->
## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Lints and fixes files
```
npm run lint
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

1. Get base64 content
```javascript
    this.$refs['signature'].getBase64PNG()
```
function would return a string of base64.
2. Get the base64 content which rotated 90 degrees counterclockwise on canvas.
```javascript
    this.$refs['signature'].getHorizontal(function(value) {
      console.log(value)
    })
```
function would return a string of base64 in callback function.
3. Reset Canvas to default status.
```javascript
    this.$refs['signature'].reset()
```
canvas would be clean.
4. Get Blob
```javascript
    this.$refs['signature'].getBlob()
```
function would return a blob object.
5. Get File
```javascript
    this.$refs['signature'].getFile()
```
function would return a file object.
6. undo
```javascript
    this.$refs['signature'].undo()
```
7. redo
```javascript
    this.$refs['signature'].redo()
```
8. draw
```javascript
    this.$refs['signature'].draw(base64)
```
set a base64 parameter then use this function to draw the content into the canvas.
