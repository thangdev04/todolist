document.addEventListener('DOMContentLoaded', () => {
    // Đăng ký sự kiện click cho nút thêm công việc
    document.querySelector('.btn__Add').addEventListener('click', (event) => {
        event.preventDefault(); // Ngăn chặn hành động mặc định của nút
        addTask();
    });
});

// Hàm để thêm một công việc mới vào danh sách
function addTask() {
    const inputElement = document.querySelector('input');
    const taskName = inputElement.value.trim();

    if (taskName) {
        // Tạo một phần tử danh sách mới cho công việc
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <span>${taskName}</span>
            <div>
               <button class="btn__Complete btn" onclick="completeTask(this)">Complete <i class="ti-check icon"></i></button>
                <button class="btn__Edit btn" onclick="editTask(this)">Edit<i class="ti-pencil-alt icon"></i></button>
                <button class="btn__Delete btn" onclick="deleteTask(this)">Delete <i class="ti-close icon"></i></button>
                <button class="btn__Undo btn " onclick="undoTask(this)" style="display: none;">Undo <i class="ti-back-right icon"></i></button>
                <button class="btn__Done btn" onclick="doneEdit(this)" style="display: none;">Done <i class="ti-widget-alt icon"></i></button>
            </div>
        `;
        
        // Thêm phần tử công việc vào danh sách
        document.querySelector('.print').appendChild(taskElement);
        inputElement.value = ''; // Xóa nội dung ô nhập sau khi thêm công việc
    }
}

// Hàm để đánh dấu công việc là đã hoàn thành
function completeTask(button) {
    const taskElement = button.parentElement.parentElement;
    taskElement.classList.add('completed'); // Thêm lớp completed để gạch ngang
    document.querySelector('.print').appendChild(taskElement); // Di chuyển công việc xuống dưới cùng
    button.style.display = 'none'; // Ẩn nút Complete
    taskElement.querySelector('.btn__Undo').style.display = 'inline'; // Hiển thị nút Undo
}

// Hàm để hoàn tác trạng thái hoàn thành của công việc
function undoTask(button) {
    const taskElement = button.parentElement.parentElement;
    taskElement.classList.remove('completed'); // Loại bỏ lớp completed
    document.querySelector('.print').insertBefore(taskElement, document.querySelector('.print').firstChild); // Di chuyển công việc lên đầu danh sách
    button.style.display = 'none'; // Ẩn nút Undo
    taskElement.querySelector('.btn__Complete').style.display = 'inline'; // Hiển thị lại nút Complete
}

// Hàm để chỉnh sửa công việc trực tiếp trên dòng đó
function editTask(button) {
    const taskElement = button.parentElement.parentElement;
    const spanElement = taskElement.querySelector('span');
    const taskName = spanElement.textContent;
    spanElement.innerHTML = `<input type="text" class="txt" value="${taskName}" />`;
    button.style.display = 'none'; // Ẩn nút Edit
    taskElement.querySelector('.btn__Done').style.display = 'inline'; // Hiển thị nút Done
}

// Hàm để lưu các thay đổi sau khi chỉnh sửa
function doneEdit(button) {
    const taskElement = button.parentElement.parentElement;
    const inputElement = taskElement.querySelector('span input');
    const newName = inputElement.value.trim();

    if (newName !== '') {
        taskElement.querySelector('span').textContent = newName;
        button.style.display = 'none'; // Ẩn nút Done
        taskElement.querySelector('.btn__Edit').style.display = 'inline'; // Hiển thị lại nút Edit
    }
}

// Hàm để xóa công việc
function deleteTask(button) {
    if (confirm('Are you sure you want to delete this task?')) {
        const taskElement = button.parentElement.parentElement;
        taskElement.remove(); // Xóa công việc khỏi danh sách 
    }
}
