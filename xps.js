function showTime() {
    const date = new Date(); // 현재 날짜와 시간을 가져옴
    let hours = date.getHours(); // 시간
    let minutes = date.getMinutes(); // 분
    let seconds = date.getSeconds(); // 초
    let session = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시는 12시로 표시
    hours = hours < 10 ? '0' + hours : hours; // 한 자리 수 시간에 0을 붙임
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
  
    const time = `${hours}:${minutes}:${seconds} ${session}`;
    document.getElementById('time').innerText = time;
  
    setTimeout(showTime, 1000); // 1초 후에 함수를 다시 실행
  }
  document.querySelectorAll('table.interactive').forEach(element => {
    element.addEventListener('click', (event) => {
      const row = event.path.find(element => element.tagName === 'TR' && element.parentElement.tagName === 'TBODY');
      if (row) {
        row.classList.toggle('highlighted');
      }
    })
  });
  showTime(); // 함수를 최초로 실행
  
// 요일별 시간표 (시간 범위 설정)
const weeklySchedule = {
    'Monday': [
      { start: '00:00', end: '08:40', activity: '잠' },
      { start: '08:40', end: '08:55', activity: '학교 갈 준비' },
      { start: '08:55', end: '09:00', activity: '통근' },
      { start: '09:00', end: '18:00', activity: '학교' },
      { start: '18:00', end: '24:00', activity: '개인공부' }
    ],
    'Tuesday': [
        { start: '00:00', end: '08:40', activity: '잠' },
        { start: '08:40', end: '08:55', activity: '학교 갈 준비' },
        { start: '08:55', end: '09:00', activity: '통근' },
        { start: '09:00', end: '18:00', activity: '학교' },
        { start: '18:00', end: '24:00', activity: '개인공부' }
    ],
    'Wednesday': [
        { start: '00:00', end: '08:40', activity: '잠' },
      { start: '08:40', end: '08:55', activity: '학교 갈 준비' },
      { start: '08:55', end: '09:00', activity: '통근' },
      { start: '09:00', end: '18:00', activity: '학교' },
      { start: '18:00', end: '24:00', activity: '개인공부' }
      ],
      'Thursday': [
        { start: '00:00', end: '08:40', activity: '잠' },
      { start: '08:40', end: '08:55', activity: '학교 갈 준비' },
      { start: '08:55', end: '09:00', activity: '통근' },
      { start: '09:00', end: '18:00', activity: '학교' },
      { start: '18:00', end: '24:00', activity: '개인공부' }
      ],
      'Friday': [
        { start: '00:00', end: '08:40', activity: '잠' },
      { start: '08:40', end: '08:55', activity: '학교 갈 준비' },
      { start: '08:55', end: '09:00', activity: '통근' },
      { start: '09:00', end: '18:00', activity: '학교' },
      { start: '18:00', end: '24:00', activity: '개인공부' }
      ]
  };
  
  // 시간 비교 함수
  function isCurrentTimeInRange(startTime, endTime, currentTime) {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
  
    const start = new Date();
    start.setHours(startHours, startMinutes, 0, 0);
  
    const end = new Date();
    end.setHours(endHours, endMinutes, 0, 0);
  
    const current = new Date();
    current.setHours(currentHours, currentMinutes, 0, 0);
  
    return current >= start && current <= end;
  }
  
  // 현재 시간과 시간표를 대조하여 메시지 표시
  function checkOwnerActivity() {
    const now = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[now.getDay()];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedHours = hours < 10 ? '0' + hours : '' + hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : '' + minutes;
    const currentTime = `${formattedHours}:${formattedMinutes}`;
  
    const daySchedule = weeklySchedule[dayName] || [];
    let activity = '운영자가 현재 활동 중이지 않습니다.';
  
    for (let i = 0; i < daySchedule.length; i++) {
      const scheduleItem = daySchedule[i];
      if (isCurrentTimeInRange(scheduleItem.start, scheduleItem.end, currentTime)) {
        activity = scheduleItem.activity;
        break;
      }
    }
  
    alert(`오늘은 ${dayName}입니다.\n현재 시간: ${currentTime}\n활동: ${activity}`);
  }
  
  // 버튼 클릭 이벤트 리스너 추가
  document.getElementById('ownerButton').addEventListener('click', checkOwnerActivity);
  
  document.getElementById('sendButton').addEventListener('click', function() {
    const message = document.getElementById('text24').value;
    
    if (message.trim() !== '') {
      // Google Form URL 및 Entry ID
      const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScAkVowMyYKx_Y_JiqdeY-4NeZYEybKshRiX8in9DJ-8r67QA/formResponse';
      const data = new FormData();
      data.append('entry.1907667868', message); // entry.YOUR_ENTRY_ID 부분을 실제 Entry ID로 교체

      // 폼 데이터 제출
      fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: data
      }).then(() => {
        alert('메시지가 성공적으로 전송되었습니다.');
        document.getElementById('text24').value = ''; // 입력란 초기화
      }).catch((error) => {
        alert('메시지 전송에 실패했습니다.');
        console.error('Error:', error);
      });
    } else {
      alert('메시지를 입력하세요.');
    }
  });

  window.onload = function() {
    // Show the popup after the page loads
    document.getElementById("overlay").style.display = "flex";

    // Fetch public IP address using ipify API
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById("publicIp").textContent = `Public IP Address: ${data.ip}`;
        })
        .catch(error => {
            document.getElementById("publicIp").textContent = 'Failed to fetch public IP address.';
            console.error('Error fetching public IP address:', error);
        });

    // Fetch private IP address using WebRTC
    getPrivateIPs(ips => {
        document.getElementById("privateIp").textContent = `Private IP Address: ${ips.join(', ')}`;
    });

    // Fetch browser and other information
    const browserInfo = getBrowserInfo();
    document.getElementById("browserInfo").textContent = `Browser: ${browserInfo.browser}, OS: ${browserInfo.os}`;
    document.getElementById("screenResolution").textContent = `Screen Resolution: ${window.screen.width}x${window.screen.height}`;
    document.getElementById("windowSize").textContent = `Window Size: ${window.innerWidth}x${window.innerHeight}`;
    document.getElementById("language").textContent = `Language: ${navigator.language}`;
    document.getElementById("platform").textContent = `Platform: ${navigator.platform}`;
    document.getElementById("cookiesEnabled").textContent = `Cookies Enabled: ${navigator.cookieEnabled ? 'Yes' : 'No'}`;
    document.getElementById("onlineStatus").textContent = `Online Status: ${navigator.onLine ? 'Online' : 'Offline'}`;
    document.getElementById("timezone").textContent = `Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    document.getElementById("pageUrl").textContent = `Page URL: ${window.location.href}`;
    document.getElementById("userAgent").textContent = `User Agent: ${navigator.userAgent}`;
    document.getElementById("referrer").textContent = `Referrer: ${document.referrer}`;
}

function closePopup() {
    // Close the popup
    document.getElementById("overlay").style.display = "none";
}

function minimizePopup() {
    // Minimize the popup
    document.getElementById("welcomePopup").style.display = "none";
}

function maximizePopup() {
    // Maximize the popup
    const popup = document.getElementById("welcomePopup");
    if (popup.style.width === '100%' && popup.style.height === '100%') {
        popup.style.width = '300px';
        popup.style.height = 'auto';
    } else {
        popup.style.width = '100%';
        popup.style.height = '100%';
    }
}

function getPrivateIPs(callback) {
    const ips = [];
    const pc = new RTCPeerConnection({
        iceServers: []
    });

    pc.createDataChannel("");
    pc.createOffer()
        .then(offer => pc.setLocalDescription(offer))
        .catch(err => console.error(err));

    pc.onicecandidate = function(event) {
        if (!event || !event.candidate) {
            callback(ips);
            return;
        }

        const candidate = event.candidate.candidate;
        const regex = /([0-9]{1,3}\.){3}[0-9]{1,3}/;
        const ipMatch = candidate.match(regex);

        if (ipMatch) {
            const ip = ipMatch[0];
            if (!ips.includes(ip)) {
                ips.push(ip);
            }
        }
    };
}

function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browser, os;

    // Parse browser information
    if (userAgent.indexOf("Firefox") > -1) {
        browser = "Mozilla Firefox";
    } else if (userAgent.indexOf("SamsungBrowser") > -1) {
        browser = "Samsung Internet";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        browser = "Opera";
    } else if (userAgent.indexOf("Trident") > -1) {
        browser = "Microsoft Internet Explorer";
    } else if (userAgent.indexOf("Edge") > -1) {
        browser = "Microsoft Edge";
    } else if (userAgent.indexOf("Chrome") > -1) {
        browser = "Google Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
        browser = "Apple Safari";
    } else {
        browser = "Unknown";
    }

    // Parse operating system information
    if (userAgent.indexOf("Win") > -1) {
        os = "Windows";
    } else if (userAgent.indexOf("Mac") > -1) {
        os = "MacOS";
    } else if (userAgent.indexOf("X11") > -1) {
        os = "UNIX";
    } else if (userAgent.indexOf("Linux") > -1) {
        os = "Linux";
    } else if (userAgent.indexOf("Android") > -1) {
        os = "Android";
    } else if (userAgent.indexOf("like Mac") > -1) {
        os = "iOS";
    } else {
        os = "Unknown";
    }

    return {
        browser: browser,
        os: os
    };
}






let hiddenCommand = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowRight', 'ArrowRight'];
let commandIndex = 0;

document.addEventListener('keydown', function(event) {
    if (event.key === hiddenCommand[commandIndex]) {
        commandIndex++;
        if (commandIndex === hiddenCommand.length) {
            showTetris();
            commandIndex = 0;
        }
    } else {
        commandIndex = 0;
    }
});

function showTetris() {
    document.getElementById('tetris-container').style.display = 'block';
    showControlsPopup();
}

function showControlsPopup() {
    document.getElementById('controls-popup').style.display = 'block';
    document.body.classList.add('lock-scroll');
}

function closeControlsPopup() {
    document.getElementById('controls-popup').style.display = 'none';
}

const canvas = document.getElementById('tetris-canvas');
const context = canvas.getContext('2d');
context.scale(20, 20);

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        player1.score += rowCount * 10;
        rowCount *= 2;
    }
}

function collide(arena, player1) {
    const [m, o] = [player1.matrix, player1.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function createPiece(type) {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === 'O') {
        return [
            [1, 1],
            [1, 1],
        ];
    } else if (type === 'L') {
        return [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
        ];
    } else if (type === 'J') {
        return [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0],
        ];
    } else if (type === 'I') {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
        return [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ];
    }
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player1.matrix, player1.pos);
}

function merge(arena, player1) {
    player1.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player1.pos.y][x + player1.pos.x] = value;
            }
        });
    });
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function playerDrop() {
    player1.pos.y++;
    if (collide(arena, player1)) {
        player1.pos.y--;
        merge(arena, player1);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

function playerMove(offset) {
    player1.pos.x += offset;
    if (collide(arena, player1)) {
        player1.pos.x -= offset;
    }
}

function playerReset() {
    const pieces = 'ILJOTSZ';
    player1.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player1.pos.y = 0;
    player1.pos.x = (arena[0].length / 2 | 0) -
                   (player1.matrix[0].length / 2 | 0);

    if (collide(arena, player1)) {
        arena.forEach(row => row.fill(0));
        player1.score = 0;
        updateScore();
    }
}

function playerRotate(dir) {
    const pos = player1.pos.x;
    let offset = 1;
    rotate(player1.matrix, dir);
    while (collide(arena, player1)) {
        player1.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player1.matrix[0].length) {
            rotate(player1.matrix, -dir);
            player1.pos.x = pos;
            return;
        }
    }
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}

function updateScore() {
    document.getElementById('score').innerText = player1.score;
}

const arena = createMatrix(12, 20);

const player1 = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
};

document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        playerMove(-1);
    } else if (event.keyCode === 39) {
        playerMove(1);
    } else if (event.keyCode === 40) {
        playerDrop();
    } else if (event.keyCode === 81) {
        playerRotate(-1);
    } else if (event.keyCode === 87) {
        playerRotate(1);
    }
});

function startGame() {
    playerReset();
    updateScore();
    update();
}






var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 2. <iframe>과 YouTube 플레이어 API를 로드한 후, 플레이어를 만듭니다.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', // 플레이어 높이 0으로 설정
        width: '0',  // 플레이어 너비 0으로 설정
        videoId: 'QQFjrS_Oxq4', // 여기에 재생할 유튜브 영상 ID를 입력하세요
        events: {
            'onReady': onPlayerReady
        }
    });
}

// 3. 플레이어가 준비되면 이 함수가 호출됩니다.
function onPlayerReady(event) {
    event.target.playVideo(); // 영상 재생
}

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Deactivate all tabs and hide all tab panels
            tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
            tabPanels.forEach(p => p.hidden = true);

            // Activate the clicked tab and show the associated panel
            tab.setAttribute('aria-selected', 'true');
            const panelId = tab.getAttribute('aria-controls');
            document.getElementById(panelId).hidden = false;
        });
    });

    // Ensure the initially selected tab is activated
    document.querySelector('[aria-selected="true"]').click();
});

function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'ko' }, 'gosu');
}

function triggerGoogleTranslate() {
    var select = document.querySelector('#gosu select');
    select.value = 'ko';
    select.dispatchEvent(new Event('change'));
}

// Ensure the Google Translate widget is initialized after the page loads
document.addEventListener('DOMContentLoaded', function() {
    googleTranslateElementInit();
});

// Include this div in your HTML
// <div id="google_translate_element" style="display:none;"></div>
document.getElementById('projectbutton').addEventListener('click', function() {
    window.location.href = 'https://0joong.github.io/project_nardi/';
});
