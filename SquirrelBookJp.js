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
  $('.home').on('click', moveHome)
  $('.contacts').on('click', moveContacts)
  $('.friends').on('click', moveFriendlist)
  $('.lottery').on('click', moveLottery)
  $('.rps').on('click', moveRps)
  $('.beg').on('click', moveBeg)
  $('#searchButton').on('click', moveSearch)
  $('#poket').html(priceToString(money) + ' ウォン')
  $('#searchBox').on('keypress', e => {
    if (e.which == 13) moveSearch()
  })
  $('.track').on('click', moveSong).css('cursor', 'pointer')
  startClock()
}

function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

let setMoney = function (num) {
  num ? (money += num) : ''
  $('#money').html(priceToString(money))
  $('#poket').html(priceToString(money) + ' ウォン')
}

function startClock() {
  const clock = setInterval(() => {
    const date = new Date()
    $('#clock').text(
      date.getHours().toString().padStart(2, '0') +
        ':' +
        date.getMinutes().toString().padStart(2, '0') +
        ':' +
        date.getSeconds().toString().padStart(2, '0') +
        ' || ' +
        date.getFullYear() +
        '.' +
        date.getMonth() +
        '.' +
        date.getDate()
    )
  }, 1000)
}

/* beg */

function startBeg() {
  $('img').css({
    width: '350px',
    height: '350px',
    'background-image': "url('./beg.png')",
    'background-size': 'cover',
  })
  let cycle = 1
  let input = 0
  setMoney()

  let cycleBey = setInterval(function () {
    $('#loc-img').css({
      width: '350px',
      height: '350px',
      'background-image': "url('./beg" + cycle + ".jpg')",
    })
    cycle == 3 ? (cycle = 1) : cycle++
  }, 1000)

  let begging = function (input) {
    let arr = [
      [0, 0, 0, 0, 0, 0, 0, 0, 100, 500],
      [0, 0, 0, 0, 0, 0, 0, 0, 500, 1000, 2000, 3000, 5000],
      [
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        100,
        500,
        1000,
        10000,
        10000,
        'F',
      ],
    ]
    let loc = arr[input - 1][Math.floor(Math.random() * arr[input - 1].length)]
    console.log(loc)
    return loc
  }

  $('.btn').on('click', function () {
    clearInterval(cycleBey)

    if ($(this).val() != input && $(this).val() == 2) {
      if (money < 1250) {
        window.alert('電車料金は1,250ウォンです。')
        return
      }
      window.alert('電車料金 : -1,250ウォン')
      setMoney(-1250)
    }
    input = $(this).val()

    let income = begging(input)
    let result
    let fail = ''
    for (let i = 0; i < Math.ceil(Math.random() * 3); i++) fail += '.'
    if (income == 'F') {
      if (money < 0) {
        window.alert('ごろつきは無駄骨に終わりました。')
        income = 0
        result = 'NICE!'
      } else {
        window.alert('ごろつきに全部盗られました。')
        income = money * -1
        result = '破産'
      }
    } else {
      result = income > 0 ? '物乞い成功' : '失敗' + fail
    }
    if (input == 3 && income > 0) result = '落ちた' + income + 'ウォン ゲット!'

    $('#beg-img').css({ 'background-image': "url('./beg.png')" })
    $('#loc-img').css({ 'background-image': "url('./beg" + input + ".jpg')" })

    $('#result').text(result)
    $('#income').text(
      income > 0 ? '+' + priceToString(income) : priceToString(income)
    )
    setMoney(income)
  })
}
/* rps */
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
    $('#poket').html(priceToString(money) + ' ウォン')
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
      window.alert('所持金が足りません。'), $('#batting').val(0)
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
  $('section').css({ height: 'initial', 'overflow-y': 'initial' })
}
function moveSearch() {
  $('section').html(makeSearchResult())
  $('section').css({ height: 'calc(100vh - 200px)', 'overflow-y': 'scroll' })
}
function moveContacts() {
  $('section').html(makeContact())
  $('section').css({ height: 'calc(100vh - 200px)', 'overflow-y': 'scroll' })
  $('section').removeClass()
  $('section').addClass('col-sm-8')
  $('aside').css('display', 'initial')
  // style="height: calc(100vh - 200px); overflow-y: scroll"
}
function moveLottery() {
  $('body').html(makeLottery())
  startLottery()
}
function moveRps() {
  $('section').html(makeRps())
  $('section').css({ height: 'initial', 'overflow-y': 'initial' })
  $('section').removeClass()
  $('section').addClass('col-sm')
  $('aside').css('display', 'none')
  startRps()
}
function moveBeg() {
  $('section').html(makeBeg())
  $('aside').css('display', 'none')
  $('section').removeClass()
  $('section').addClass('col-sm')
  $('section').css({ height: 'initial', 'overflow-y': 'initial' })
  startBeg()
}
function moveHome() {
  $('section').html(makeCarousel())
  $('section').css({ height: 'initial', 'overflow-y': 'initial' })
  $('section').removeClass()
  $('section').addClass('col-sm-8')
  $('aside').css('display', 'initial')
  $('.contacts').on('click', moveContacts)
  $('.lottery').on('click', moveLottery)
  $('.rps').on('click', moveRps)
  $('.beg').on('click', moveBeg)
}
function moveFriendlist() {
  $('section').html(makeFriendlist())
  $('section').css({ height: 'calc(100vh - 200px)', 'overflow-y': 'scroll' })
  $('section').removeClass()
  $('section').addClass('col-sm-8')
  $('aside').css('display', 'initial')
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
  const html =
    // danbisan css
    '<link rel="stylesheet" href="./styles.css" />' +
    // bootstrap
    '    <link\r\n' +
    '      rel="stylesheet"\r\n' +
    '      href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"\r\n' +
    '      integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"\r\n' +
    '      crossorigin="anonymous" />' +
    '<div id="wrap">\r\n' +
    "      <header><h1>宝くじ推選</h1><h1 class='money'>0</h1></header>\r\n" +
    '      <hr />\r\n' +
    '      <nav>\r\n' +
    '        <ul>\r\n' +
    '          <li>\r\n' +
    '            <a\r\n' +
    '              href="https://dhlottery.co.kr/gameInfo.do?method=buyLotto&wiselog=C_A_1_3"\r\n' +
    '              >宝くじ購入</a\r\n' +
    '            >\r\n' +
    '          </li>\r\n' +
    '          <li><a href="#">宝くじ商品のご案内</a></li>\r\n' +
    '          <li>\r\n' +
    '            <a\r\n' +
    '              href="https://dhlottery.co.kr/gameResult.do?method=byWin&wiselog=C_A_1_1"\r\n' +
    '              >当選結果</a\r\n' +
    '            >\r\n' +
    '          </li>\r\n' +
    '          <li><a href="#">宝くじ売り場</a></li>\r\n' +
    '          <li><a href="#">イベント</a></li>\r\n' +
    '        </ul>\r\n' +
    '      </nav>\r\n' +
    '      <main>\r\n' +
    '        <article>\r\n' +
    '          <h4 id="drownum"></h4>\r\n' +
    '          <div class="win"></div>\r\n' +
    '          <span class="plus">+</span>\r\n' +
    '          <div class="win_bonus"></div>\r\n' +
    '        </article>\r\n' +
    '        <aside>\r\n' +
    '          <h4>ランダム番号生成</h4>\r\n' +
    '          <div class="result"></div>\r\n' +
    '          <span class="plus">+</span>\r\n' +
    '          <div class="bonus"></div>\r\n' +
    '        </aside>\r\n' +
    '        <div class="btn_wrap">\r\n' +
    '          <button class="ran">推選</button>\r\n' +
    '          <button class="test" value="4">5등</button>\r\n' +
    '          <button class="test" value="3">4등</button>\r\n' +
    '          <button class="test" value="2">3등</button>\r\n' +
    '          <button class="test" value="1">2등</button>\r\n' +
    '          <button class="test" value="0">1등</button>\r\n' +
    '        </div>\r\n' +
    '        <h4 class="prize">わくわく</h4>\r\n' +
    '      </main>\r\n' +
    '    </div>'
  return html
}
function makeBeg() {
  const html =
    '<div class="text-md-center">\r\n' +
    '            <h1 class="p-t-1">物乞い</h1>\r\n' +
    '        </div>\r\n' +
    '        <hr>\r\n' +
    '        <div class="row justify-content-around">\r\n' +
    '            <div class="col-sm-6 col-md-4 col-md-offset-2">\r\n' +
    '                <img class="img-fluid p-a-1" id="beg-img" width="100%" height="100%">\r\n' +
    '            </div>\r\n' +
    '            <div class="d-flex flex-column justify-content-around" style="width:100px">\r\n' +
    '                <h2 class="fs-3 text-center" id="result"></h2>\r\n' +
    '                <h2 class="fs-3 text-center" id="income"></h2>\r\n' +
    '            </div>\r\n' +
    '            <div class="col-sm-6 col-md-4">\r\n' +
    '                <img class="img-fluid p-a-1" id="loc-img" width="100%" height="100%">\r\n' +
    '            </div>\r\n' +
    '            <div class="col-xs-12 col-md-8 col-md-offset-2">\r\n' +
    '                <div class="row btn-group-flex m-b-1 justify-content-center" id="play-btn">\r\n' +
    '                    <button type="button" class="btn btn-primary btn-lg btn-choice m-2" value="1">路上</button>\r\n' +
    '                    <button type="button" class="btn btn-primary btn-lg btn-choice m-2" value="2">地下鉄道</button>\r\n' +
    '                    <button type="button" class="btn btn-primary btn-lg btn-choice m-2" value="3">裏路地</button>\r\n' +
    '                </div>\r\n' +
    '            </div>\r\n' +
    '            <div class="col-xs-12 col-md-8 col-md-offset-2">\r\n' +
    '            </div>\r\n' +
    '            <div class="col-xs-12 col-md-8 col-md-offset-2">\r\n' +
    '                <div class="row btn-group-flex m-b-1 justify-content-center">\r\n' +
    '                    <h2 class="w-25 fs-3">お金</h2>\r\n' +
    '                    <h2 class="fs-3" id="money">0</h2>\r\n' +
    '                    <h2 class="fs-3">ウォン</h2>\r\n' +
    '                </div>\r\n' +
    '            </div>\r\n' +
    '        </div>'
  return html
}
function makeRps() {
  const html =
    '<div class="text-md-center">\r\n' +
    '        <h1 class="p-t-1">じゃんけんゲーム</h1>\r\n' +
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
    '              グー (x<span id="">1</span>)\r\n' +
    '            </button>\r\n' +
    '            <button\r\n' +
    '              type="button"\r\n' +
    '              class="btn btn-primary btn-lg btn-choice m-2"\r\n' +
    '              value="2">\r\n' +
    '              チョキ (x<span id="">4</span>)\r\n' +
    '            </button>\r\n' +
    '            <button\r\n' +
    '              type="button"\r\n' +
    '              class="btn btn-primary btn-lg btn-choice m-2"\r\n' +
    '              value="3">\r\n' +
    '              パー (x<span id="">2</span>)\r\n' +
    '            </button>\r\n' +
    '            <button\r\n' +
    '              type="button"\r\n' +
    '              class="btn btn-primary btn-lg btn-choice m-2"\r\n' +
    '              value="4">\r\n' +
    '              ランダム (x<span id="">1.13</span>)\r\n' +
    '            </button>\r\n' +
    '          </div>\r\n' +
    '        </div>\r\n' +
    '        <div class="col-xs-12 col-md-8 col-md-offset-2">\r\n' +
    '          <div class="row btn-group-flex m-b-1 justify-content-center">\r\n' +
    '            <h2 class="fs-3 mx-3">バッティング</h2>\r\n' +
    '            <h2 class="fs-3">\r\n' +
    '              <input type="text" class="form-control wd-25" id="batting" />\r\n' +
    '            </h2>\r\n' +
    '            <h2 class="fs-3 mx-2">ウォン</h2>\r\n' +
    '          </div>\r\n' +
    '        </div>\r\n' +
    '        <div class="col-xs-12 col-md-8 col-md-offset-2">\r\n' +
    '          <div class="row btn-group-flex m-b-1 justify-content-center">\r\n' +
    '            <h2 class="w-25 fs-3">お金</h2>\r\n' +
    '            <h2 class="fs-3" id="money">0</h2>\r\n' +
    '            <h2 class="fs-3">ウォン</h2>\r\n' +
    '          </div>\r\n' +
    '        </div>\r\n' +
    '      </div>'
  return html
}
function makeCarousel() {
  return (
    '<div\r\n' +
    '            id="carouselExampleFade"\r\n' +
    '            class="carousel slide carousel-fade"\r\n' +
    '            data-ride="carousel">\r\n' +
    '            <ol class="carousel-indicators">\r\n' +
    '              <li\r\n' +
    '                data-target="#carouselExampleCaptions"\r\n' +
    '                data-slide-to="0"\r\n' +
    '                class="active"></li>\r\n' +
    '              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>\r\n' +
    '              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>\r\n' +
    '              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>\r\n' +
    '            </ol>\r\n' +
    '            <div class="carousel-inner">\r\n' +
    '              <div\r\n' +
    '                style="max-width: 730px; max-height: 480px"\r\n' +
    '                class="carousel-item active">\r\n' +
    '                <img\r\n' +
    '                  style="filter: brightness(80%)"\r\n' +
    '                  src="purple.png"\r\n' +
    '                  class="contacts d-block w-100"\r\n' +
    '                  alt="..." />\r\n' +
    '                <div class="carousel-caption d-none d-md-block">\r\n' +
    '                  <h1>リスブックで友達探し</h1>\r\n' +
    '                  <h5>今すく友達を探そう</h5>\r\n' +
    '                </div>\r\n' +
    '              </div>\r\n' +
    '              <div\r\n' +
    '                style="max-width: 730px; max-height: 480px"\r\n' +
    '                class="carousel-item">\r\n' +
    '                <img\r\n' +
    '                  style="filter: brightness(80%)"\r\n' +
    '                  src="rps.jpg"\r\n' +
    '                  class="rps d-block w-100"\r\n' +
    '                  alt="..." />\r\n' +
    '                <div class="carousel-caption d-none d-md-block">\r\n' +
    '                  <h1>じゃんけんゲーム</h1>\r\n' +
    '                  <h5>AIに勝て</h5>\r\n' +
    '                </div>\r\n' +
    '              </div>\r\n' +
    '              <div\r\n' +
    '                style="max-width: 730px; max-height: 480px"\r\n' +
    '                class="carousel-item">\r\n' +
    '                <img\r\n' +
    '                  style="filter: brightness(80%)"\r\n' +
    '                  src="lottery.jpg"\r\n' +
    '                  class="lottery d-block w-100"\r\n' +
    '                  alt="..." />\r\n' +
    '                <div class="carousel-caption d-none d-md-block">\r\n' +
    '                  <h1>宝くじ</h1>\r\n' +
    '                  <h5>あなたの幸運を試そう</h5>\r\n' +
    '                </div>\r\n' +
    '              </div>\r\n' +
    '              <div\r\n' +
    '                style="max-width: 730px; max-height: 480px"\r\n' +
    '                class="carousel-item">\r\n' +
    '                <img\r\n' +
    '                  style="filter: brightness(80%)"\r\n' +
    '                  src="beg.jpg"\r\n' +
    '                  class="beg d-block w-100"\r\n' +
    '                  alt="..." />\r\n' +
    '                <div class="carousel-caption d-none d-md-block">\r\n' +
    '                  <h1>物乞い</h1>\r\n' +
    '                  <h5>2回目の人生を始めよう！</h5>\r\n' +
    '                </div>\r\n' +
    '              </div>\r\n' +
    '            </div>\r\n' +
    '            <button\r\n' +
    '              class="carousel-control-prev"\r\n' +
    '              type="button"\r\n' +
    '              data-target="#carouselExampleFade"\r\n' +
    '              data-slide="prev">\r\n' +
    '              <span\r\n' +
    '                class="carousel-control-prev-icon"\r\n' +
    '                aria-hidden="true"></span>\r\n' +
    '              <span class="sr-only">Previous</span>\r\n' +
    '            </button>\r\n' +
    '            <button\r\n' +
    '              class="carousel-control-next"\r\n' +
    '              type="button"\r\n' +
    '              data-target="#carouselExampleFade"\r\n' +
    '              data-slide="next">\r\n' +
    '              <span\r\n' +
    '                class="carousel-control-next-icon"\r\n' +
    '                aria-hidden="true"></span>\r\n' +
    '              <span class="sr-only">Next</span>\r\n' +
    '            </button>\r\n' +
    '          </div>'
  )
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
/* lottery */
// 번호에 따라 다른 색깔 반환
function getColor(number) {
  let color = 'rgb(251, 196, 0)' // 10 미만
  if (number >= 10 && number < 20) {
    color = 'rgb(105, 200, 242)'
  } else if (number >= 20 && number < 30) {
    color = 'rgb(255, 114, 114)'
  } else if (number >= 30 && number < 40) {
    color = 'rgb(170, 170, 170)'
  } else if (number >= 40 && number < 50) {
    color = 'rgb(176, 216, 64)'
  }
  return color
}

//랜덤번호생성 화면 표시
function displayLotto(lotto) {
  $('.result').empty()
  $('.bonus').empty()
  for (var i = 0; i < 7; i++) {
    if (i == 0) {
      var div = $("<div class='result-" + i + "'></div>")
        .text(lotto[0])
        .hide()
        .css('background-color', getColor(lotto[i]))
      $('.bonus').append(div)
      lotto[0] = 0
    } else {
      lotto.sort((a, b) => {
        return a - b
      })
      var div = $("<div class='result-" + i + "'></div>")
        .text(lotto[i])
        .hide()
        .css('background-color', getColor(lotto[i]))
      $('.result').append(div)
    }
  }
  $('.result > div').fadeIn(0)
  $('.bonus > div').fadeIn(0)
}

//당첨결과 화면 표시
function displayWin(lotto) {
  $('.win').empty()
  $('.win-bonus').empty()
  for (var i = 0; i < 7; i++) {
    if (i == 0) {
      var div = $("<div class='win-" + i + "'></div>")
        .text(lotto[0])
        .hide()
        .css('background-color', getColor(lotto[i]))
      $('.win_bonus').append(div)
      lotto[0] = 0
    } else {
      var div = $("<div class='win-" + i + "'></div>")
        .text(lotto[i])
        .hide()
        .css('background-color', getColor(lotto[i]))
      $('.win').append(div)
    }
  }
  $('.win > div').fadeIn(0)
  $('.win_bonus > div').fadeIn(0)
}

function creatLotto() {
  var lotto = new Array(7)
  for (var i = 0; i < lotto.length; i++) {
    lotto[i] = Math.ceil(Math.random() * 45)
    for (var j = 0; j < i; j++) {
      if (lotto[i] == lotto[j]) {
        i--
      }
    }
  }
  displayLotto(lotto)
}

//랜덤 번호와 당첨결과 비교
function resultLotto() {
  var match = 0
  var bonus = false
  for (var i = 0; i < 7; i++) {
    if (i > 0) {
      for (var j = 1; j <= i; j++) {
        match += $('.win-' + i).text() == $('.result-' + j).text() ? 1 : 0
      }
    } else {
      bonus = $('.win-' + i).text() == $('.result-' + i).text() ? true : false
    }
  }
  if (match < 3) return -1
  if (match == 3) return 4
  if (match == 4) return 3
  if (match == 5) return 2
  if (match == 5 && bonus) return 1
  if (match == 6) return 0
}

// function setMoney(money) {
//   $('.money').text(priceToString(money) + '원')
// }

// 원 단위 표시
function priceToString(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function startLottery() {
  var divisions
  var money = 100000
  setMoney(money)

  $.ajax({
    type: 'get',
    url: 'https://smok95.github.io/lotto/results/latest.json',
    dataType: 'json',
    success: function (data) {
      let winArr = data.numbers
      winArr.unshift(data.bonus_no)
      $('#drownum').text('第' + data.draw_no + '回 当選結果')
      $('.win').append(displayWin(winArr))
      divisions = data.divisions
    },
  })

  // 버튼을 눌렀을 때 번호가 추첨되도록 이벤트 등록
  $('button').click(function () {
    var result
    if ($(this).val() > 0) {
      var cnt = 0
      while (true) {
        creatLotto()
        result = resultLotto()
        cnt++
        if (result == $(this).val()) {
          console.log(cnt)
          break
        }
      }
      money -= 1000 * cnt
    } else {
      creatLotto()
      result = resultLotto()
      money -= 1000
    }

    var prize
    if (result > 0) {
      prize =
        '<p>' +
        (result + 1) +
        '等</p><p>' +
        priceToString(divisions[result].prize) +
        'ウォン</p><p>' +
        ' 組 : ' +
        divisions[result].winners++ +
        ' 名</p>'
      money += divisions[result].prize
    } else prize = 'はずれ'
    $('.prize').html(prize)
    setMoney(money)
  })
}
