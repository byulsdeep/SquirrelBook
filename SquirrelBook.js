

let data
let friendlist = []
let money = 1000
$(() => {
  $.ajax({
    url: 'https://sample.bmaster.kro.kr/contacts',
    success: data => {
      this.data = data
      init()
    },
    error: e => $('section').append(e),
  })
})
function init() {
  // $('section').append(makeContact())
  $('#home').on('click', moveHome)
  $('#contacts').on('click', moveContacts)
  $('#friends').on('click', moveFriendlist)
  $('#lottery').on('click', moveLottery)
  $('#rps').on('click', moveRps)
  $('#searchButton').on('click', moveSearch)
  $('.poket').html(priceToString(money) + " 원")
  $('#searchBox').on('keypress', e => {
    if (e.which == 13) moveSearch()
  })
  $('.track').on('click', moveSong).css('cursor', 'pointer')
  startClock()
}

function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function startClock() {
  const clock = setInterval(() => {
    const date = new Date()
    $('#clock').text(
      date.getHours().toString().padStart(2, '0') +
        ':' +
        date.getMinutes().toString().padStart(2, '0') +
        ':' +
        date.getSeconds().toString().padStart(2, '0')
    )
  }, 1000)
}
function startRps() {
  let cycle = 1

  let cycleRsp = setInterval(function () {
    $('#com-img').css({
      width: '350px',
      height: '350px',
      'background-image': "url('./" + cycle + ".png')",
    })
    $('#play-img').css({
      width: '350px',
      height: '350px',
      'background-image': "url('./" + cycle + ".png')",
    })
    cycle == 3 ? (cycle = 1) : cycle++
  }, 300)

  let setMoney = function (num) {
    num ? (money += num) : ''
    $('#money').html(priceToString(money))
    $('.poket').html(priceToString(money) + " 원")
  }

  let setRate = function () {
    let temp = Array(3)
    let rate = [1, 1.7, 3]
    for (let i = 0; i < 3; i++) {
      temp[i] = rate[Math.floor(Math.random() * 3)]
      for (let j = 0; j < i; j++) {
        temp[i] == temp[j] ? i-- : ''
      }
    }
    for (let i = 0; i < 3; i++) {
      $('#play-btn')
        .find('span:eq(' + i + ')')
        .text(temp[i])
    }
  }

  let getRate = function (idx) {
    // 0-3
    return $('#play-btn')
      .find('span:eq(' + (idx - 1) + ')')
      .text()
  }

  setRate()
  setMoney()

  $('.btn').on('click', function () {
    if ($('#batting').val() > money) {
      window.alert('소지금을 넘을 수 없습니다.'), $('#batting').val(0)
    } else {
      clearInterval(cycleRsp)
      let play
      $(this).val() != 4
        ? (play = $(this).val())
        : (play = Math.ceil(Math.random() * 3))
      let com
      com = Math.ceil(Math.random() * 3)
      let result
      let income

      $('#play-img').css({
        'background-image': "url('./" + play + ".png')",
      })
      $('#com-img').css({ 'background-image': "url('./" + com + ".png')" })

      if (play - com == 2 || play - com == -1) {
        console.log(getRate($(this).val()))
        income = Math.ceil($('#batting').val() * getRate($(this).val()))
        result = 'Win!!'
      } else if (play == com) {
        income = 0
        result = 'Draw!'
      } else {
        income = Math.ceil($('#batting').val() * getRate($(this).val())) * -1
        // income = $('#batting').val() * -1;
        result = 'Lose'
      }

      $('#result').text(result)
      $('#income').text(income > 0 ? '+' + income : income)
      setMoney(income)
      setRate()
    }
  })
}
function moveSong() {
  $('section').html($($(this).children()[0]).clone().css('display', 'initial'))
}
function moveSearch() {
  $('section').html(makeSearchResult())
}
function moveContacts() {
  $('section').html(makeContact())
}
function moveLottery() {
  $('section').html(makeLottery())
}
function moveRps() {
  $('section').html(makeRps())
  startRps()
}
function moveHome() {
  $('section').html(makeCarousel())
}
function moveFriendlist() {
  $('section').html(makeFriendlist())
}
function makeSearchResult() {
  const table = $('<table>').addClass('table')
  const thead = $('<tr>')
  Object.keys(this.data.contacts[0]).forEach(key =>
    thead.append(key === 'no' ? null : $('<th>').text(key))
  )
  thead.append($('<th>').text('🤍'))
  table.append(thead)
  $(this.data.contacts).each((i, contact) => {
    // console.log(contact.name)
    if (
      contact.name
        .toUpperCase()
        .includes($('#searchBox').val().toUpperCase()) ||
      contact.tel.includes($('#searchBox').val()) ||
      contact.address.includes($('#searchBox').val())
    ) {
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
              .text(friendlist.includes(contact.no) ? '❤' : '🤍')
              .on('click', () => {
                if (friendlist.includes(contact.no)) {
                  friendlist.splice(friendlist.indexOf(contact.no), 1)
                } else {
                  friendlist.push(contact.no)
                }
                button.text(button.text() === '❤' ? '🤍' : '❤')
              })
          )
          .append(
            $('<button>')
              .addClass('btn btn-light')
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
      table.append(tr)
    }
  })
  return table
}
function makeLottery() {
  return null
}
function makeRps() {
  const html =
    '<div class="text-md-center">\r\n' +
    '        <h1 class="p-t-1">가위 바위 보</h1>\r\n' +
    '      </div>\r\n' +
    '      <hr />\r\n' +
    '      <div class="row justify-content-around">\r\n' +
    '        <div class="col-sm-6 col-md-4 col-md-offset-2">\r\n' +
    '          <img\r\n' +
    '            class="img-fluid p-a-1"\r\n' +
    '            id="play-img"\r\n' +
    '            width="100%"\r\n' +
    '            height="100%" />\r\n' +
    '        </div>\r\n' +
    '        <div\r\n' +
    '          class="d-flex flex-column justify-content-around"\r\n' +
    '          style="width: 100px">\r\n' +
    '          <h2 class="fs-3 text-center" id="result"></h2>\r\n' +
    '          <h2 class="fs-3 text-center" id="income"></h2>\r\n' +
    '        </div>\r\n' +
    '        <div class="col-sm-6 col-md-4">\r\n' +
    '          <img\r\n' +
    '            class="img-fluid p-a-1"\r\n' +
    '            id="com-img"\r\n' +
    '            width="100%"\r\n' +
    '            height="100%" />\r\n' +
    '        </div>\r\n' +
    '        <div class="col-xs-12 col-md-8 col-md-offset-2">\r\n' +
    '          <div\r\n' +
    '            class="row btn-group-flex m-b-1 justify-content-center"\r\n' +
    '            id="play-btn">\r\n' +
    '            <button\r\n' +
    '              type="button"\r\n' +
    '              class="btn btn-primary btn-lg btn-choice m-2"\r\n' +
    '              value="1">\r\n' +
    '              바위 (x<span id="">1</span>)\r\n' +
    '            </button>\r\n' +
    '            <button\r\n' +
    '              type="button"\r\n' +
    '              class="btn btn-primary btn-lg btn-choice m-2"\r\n' +
    '              value="2">\r\n' +
    '              가위 (x<span id="">4</span>)\r\n' +
    '            </button>\r\n' +
    '            <button\r\n' +
    '              type="button"\r\n' +
    '              class="btn btn-primary btn-lg btn-choice m-2"\r\n' +
    '              value="3">\r\n' +
    '              보 (x<span id="">2</span>)\r\n' +
    '            </button>\r\n' +
    '            <button\r\n' +
    '              type="button"\r\n' +
    '              class="btn btn-primary btn-lg btn-choice m-2"\r\n' +
    '              value="4">\r\n' +
    '              랜덤 (x<span id="">1.13</span>)\r\n' +
    '            </button>\r\n' +
    '          </div>\r\n' +
    '        </div>\r\n' +
    '        <div class="col-xs-12 col-md-8 col-md-offset-2">\r\n' +
    '          <div class="row btn-group-flex m-b-1 justify-content-center">\r\n' +
    '            <h2 class="fs-3 mx-3">Batting</h2>\r\n' +
    '            <h2 class="fs-3">\r\n' +
    '              <input type="text" class="form-control wd-25" id="batting" />\r\n' +
    '            </h2>\r\n' +
    '            <h2 class="fs-3 mx-2">원</h2>\r\n' +
    '          </div>\r\n' +
    '        </div>\r\n' +
    '        <div class="col-xs-12 col-md-8 col-md-offset-2">\r\n' +
    '          <div class="row btn-group-flex m-b-1 justify-content-center">\r\n' +
    '            <h2 class="w-25 fs-3">Money</h2>\r\n' +
    '            <h2 class="fs-3" id="money">0</h2>\r\n' +
    '            <h2 class="fs-3">원</h2>\r\n' +
    '          </div>\r\n' +
    '        </div>\r\n' +
    '      </div>'
  return html
}
function makeCarousel() {
  return null
}
function makeFriendlist() {
  const table = $('<table>').addClass('table')
  const thead = $('<tr>')
  Object.keys(this.data.contacts[0]).forEach(key =>
    thead.append(key === 'no' ? null : $('<th>').text(key))
  )
  thead.append($('<th>').text('❤'))
  table.append(thead)
  $(this.data.contacts).each((i, contact) => {
    if (friendlist.includes(contact.no)) {
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
            button.text('❤').on('click', () => {
              friendlist.splice(friendlist.indexOf(contact.no), 1)
              tr.remove()
            })
          )
          .append(
            $('<button>')
              .addClass('btn btn-light')
              .text('❌')
              .on('click', () => {
                friendlist.splice(friendlist.indexOf(contact.no), 1)
                this.data.contacts = this.data.contacts.filter(
                  c => contact.no !== c.no
                )
                tr.remove()
              })
          )
      )
      table.append(tr)
    }
  })
  return table
}
function makeContact() {
  const table = $('<table>').addClass('table')
  const thead = $('<tr>')
  Object.keys(this.data.contacts[0]).forEach(key =>
    thead.append(key === 'no' ? null : $('<th>').text(key))
  )
  thead.append($('<th>').text('🤍'))
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
            .text(friendlist.includes(contact.no) ? '❤' : '🤍')
            .on('click', () => {
              if (friendlist.includes(contact.no)) {
                friendlist.splice(friendlist.indexOf(contact.no), 1)
              } else {
                friendlist.push(contact.no)
              }
              button.text(button.text() === '❤' ? '🤍' : '❤')
            })
        )
        .append(
          $('<button>')
            .addClass('btn btn-light')
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
    table.append(tr)
  })
  return table
}
