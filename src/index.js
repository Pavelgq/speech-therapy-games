import App from './app/app';
import userInfo from './tests/user-info';
import lessonInfo from './tests/lesson-info';

const app = new App();

app.init(document.body, userInfo, lessonInfo)