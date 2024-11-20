let username = '';
let answers = {
    q1: '',
    q2: ''
};

// بدء الاستطلاع بعد إدخال اسم المستخدم
function startSurvey() {
    username = document.getElementById('username').value;
    if (username) {
        document.getElementById('username-form').style.display = 'none';
        document.getElementById('survey-form').style.display = 'block';
    } else {
        alert('يرجى إدخال اسم المستخدم.');
    }
}

// إرسال الاستطلاع
function submitSurvey() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');

    if (q1 && q2) {
        answers.q1 = q1.value;
        answers.q2 = q2.value;
        
        document.getElementById('survey-form').style.display = 'none';
        document.getElementById('results').style.display = 'block';
        displayResults();
    } else {
        alert('يرجى الإجابة على جميع الأسئلة.');
    }
}

// عرض النتائج باستخدام الرسوم البيانية
function displayResults() {
    const ctx = document.getElementById('results-chart').getContext('2d');
    
    const data = {
        labels: ['التفكير النقدي', 'التعاون'],
        datasets: [{
            label: 'نتائج الاستطلاع',
            data: [
                answers.q1 === 'نعم' ? 1 : 0,
                answers.q2 === 'نعم' ? 1 : 0
            ],
            backgroundColor: ['#28a745', '#dc3545'],
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        }
    });
}

// مشاركة النتائج على وسائل التواصل الاجتماعي
function shareResults() {
    const resultText = `نتائج استطلاع الرأي: \nتفكير نقدي: ${answers.q1}\nتعاون: ${answers.q2}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(resultText)}`;
    window.open(url, '_blank');
}