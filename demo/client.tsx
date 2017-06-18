
import * as React from 'react';
import { render } from 'react-dom';
import MyAwesomeComponent from '../src/MyAwesomeComponent';
require('./styles.scss');
render(
    <div>
        <MyAwesomeComponent>
        </MyAwesomeComponent>
    </div>,
    document.getElementById('app_container')
);