let data
let friendlist = []
$(() => {
  $('body').append(makeNav())
  makeContact()
    .then(table => {
      $('section').append(table)
    })
    .catch(err => $('section').append(err))
})
function makeNav() {
  const nav = $('<nav>')
  return nav
}
function makeContact() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'https://sample.bmaster.kro.kr/contacts',
      success: data => {
        this.data = data
        const table = $('<table>').addClass('table')
        const thead = $('<tr>')
        Object.keys(this.data.contacts[0]).forEach(key =>
          thead.append(key === 'no' ? null : $('<th>').text(key))
        )
        thead.append($('<th>').text('❤'))
        table.append(thead)
        $(this.data.contacts).each((i, contact) => {
          const tr = $('<tr>')
          Object.keys(contact).forEach(key => {
            tr.append(
              key === 'no'
                ? null
                : $('<td>').append(
                    key === 'photo'
                      ? $('<img>', {
                          src: contact[key],
                          width: '128px',
                        }).addClass('img-fluid img-thumbnail')
                      : contact[key]
                  )
            )
          })
          const button = $('<button>').addClass('btn btn-light')
          tr.append(
            $('<td>')
              .append(
                button
                  .text(friendlist.includes(contact.no) ? '🤍' : '❤')
                  .on('click', () => {
                    if (friendlist.includes(contact.no)) {
                      friendlist.splice(friendlist.indexOf(contact.no), 1)
                    } else {
                      friendlist.push(contact.no)
                    }
                    button.text(button.text() === '🤍' ? '❤' : '🤍')
                  })
              )
              .append(
                $('<button>').addClass('btn btn-light')
                  .text('❌')
                  .on('click', () => {
                    if (friendlist.includes(contact.no)) {
                      friendlist.splice(friendlist.indexOf(contact.no), 1)
                    }
                    this.data.contacts = this.data.contacts.filter(
                      c => contact.no !== c.no
                    )
                    tr.remove()
                  })
              )
          )
          if (contact.name === 'Aki Cruz') tr.addClass('bg-danger')
          table.append(tr)
        })
        resolve(table)
      },
      error: err => reject(err),
    })
  })
}
