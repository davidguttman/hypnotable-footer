var through = require('event-stream').through

module.exports = function htfooter (el, columns) {

  var stream = through(onData)

  var foot = document.createElement('tfoot')
  var footRow = document.createElement('tr')
  var tbody = document.querySelector('tbody')

  foot.appendChild(footRow)
  el.insertBefore(foot, tbody)

  stream.on('data', function(data) {
    var cells = data.cells
    footRow.innerHTML = ''
    cells.forEach(function(cell) {
      var td = document.createElement('td')
      td.classList.add(cell.className)
      td.dataset.value = cell.serialized
      td.innerHTML = cell.text || ''
      footRow.appendChild(td)
    })
  })

  var memos = []

  function onData (data) {
    var cells = columns.map(function(column, i) {
      var cell = {}

      if (column.reduce) {
        var rVal = memos[i] = column.reduce(data, memos[i])

        if (typeof column.property === 'function') {
          cell.value = column.property(rVal)
        } else {
          cell.value = rVal[column.property]
        }

        if (column.className) {
          cell.className = column.className
        } else {
          cell.className = column.property
        }

        if (cell.value != null) {
          cell.serialized = JSON.stringify(cell.value)
        } else {
          cell.serialized = "null"
        }

        if (column.template) {
          cell.text = column.template(cell.value, data)
        } else {
          cell.text = cell.value
        }
      }

      return cell
    })

    this.queue({cells: cells, obj: data})
  }

  return stream
}
