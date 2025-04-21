let students = [
  {
    "ten": "Lê Thanh Nguyên",
    "tuoi": 14,
    "lop": "7A6",
    "sothich": "Đọc sách, xem phim",
    "facebook": "https://www.facebook.com/thanh.le.916698",
    "avatar": "images/default-avatar.jpg"
  },
  // Các học sinh khác sẽ được thêm vào nếu có.
];

let classes = {
  6: "Chưa có thông tin",
  7: [
    { lop: "7A1", info: "Chưa có thông tin" },
    { lop: "7A2", info: "Chưa có thông tin" },
    { lop: "7A3", info: "Chưa có thông tin" },
    { lop: "7A4", info: "Chưa có thông tin" },
    { lop: "7A5", info: "Chưa có thông tin" },
    { lop: "7A6", info: "Đã có thông tin của 1 học sinh" },
    { lop: "7A7", info: "Chưa có thông tin" },
    { lop: "7A8", info: "Chưa có thông tin" },
    { lop: "7A9", info: "Chưa có thông tin" },
    { lop: "7A10", info: "Chưa có thông tin" },
    { lop: "7A11", info: "Chưa có thông tin" },
    { lop: "7A12", info: "Chưa có thông tin" }
  ],
  8: "Chưa có thông tin",
  9: "Chưa có thông tin"
};

function renderStudents(data) {
  const container = document.getElementById('students-list');
  container.innerHTML = '';

  if (data.length === 0) {
    container.innerHTML = '<p>Vui lòng tìm học sinh bạn muốn tìm.</p>';
    return;
  }

  data.forEach(hs => {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.innerHTML = `
      <img src="${hs.avatar || 'images/default-avatar.jpg'}" alt="Avatar">
      <div class="student-info">
        <h3>${hs.ten}</h3>
        <p><strong>Tuổi:</strong> ${hs.tuoi}</p>
        <p><strong>Lớp:</strong> ${hs.lop}</p>
        <p><strong>Sở thích:</strong> ${hs.sothich}</p>
        <p><a href="${hs.facebook}" target="_blank">Facebook cá nhân</a></p>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderClasses() {
  const container = document.getElementById('class-list');
  container.innerHTML = '';

  const classSelect = document.getElementById('classFilter');
  const selectedClass = classSelect.value;

  if (selectedClass === "6" || selectedClass === "8" || selectedClass === "9") {
    const classCard = document.createElement('div');
    classCard.className = 'class-card';
    classCard.innerHTML = `<h3>Khối ${selectedClass}</h3><p>Chưa có thông tin</p>`;
    container.appendChild(classCard);
  } else if (selectedClass === "7") {
    classes[7].forEach(classInfo => {
      const classCard = document.createElement('div');
      classCard.className = 'class-card';
      classCard.innerHTML = `
        <h3>${classInfo.lop}</h3>
        <p>${classInfo.info}</p>
        <button onclick="viewClass('${classInfo.lop}')">Xem</button>
      `;
      container.appendChild(classCard);
    });
  }
}

function viewClass(className) {
  const container = document.getElementById('students-list');
  container.innerHTML = '';

  const classData = classes[7].find(c => c.lop === className);

  if (classData && classData.info === "Đã có thông tin của 1 học sinh") {
    renderStudents([{
      "ten": "Lê Thanh Nguyên",
      "tuoi": 14,
      "lop": className,
      "sothich": "Đọc sách, võ thuật",
      "facebook": "https://www.facebook.com/thanh.le.916698",
      "avatar": "images/default-avatar.jpg"
    }]);
  } else {
    container.innerHTML = `<p>Chưa có thông tin cho lớp ${className}</p>`;
  }
}

document.getElementById('classFilter').addEventListener('change', renderClasses);
document.getElementById('searchInput').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const filteredStudents = students.filter(hs => hs.ten.toLowerCase().includes(searchTerm));
  renderStudents(filteredStudents);
});

renderClasses();
