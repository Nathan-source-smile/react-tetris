import React from 'react';
import QRCode from 'qrcode';
import style from './index.less';
import { transform, i18n, lan } from '../../unit/const';
import { isMobile } from '../../unit';


export default class Guide extends React.Component {
  constructor() {
    super();
    this.state = {
      isMobile: isMobile(),
      QRCode: '',
    };
  }
  componentWillMount() {
    if (this.state.isMobile) {
      return;
    }
    QRCode.toDataURL(location.href, { margin: 1 })
        .then(dataUrl => this.setState({ QRCode: dataUrl }));
  }
  shouldComponentUpdate(state) {
    if (state.QRCode === this.state.QRCode) {
      return false;
    }
    return true;
  }
  render() {
    if (this.state.isMobile) {
      return (
        null
      );
    }
    return (
      <div style={{ display: this.state.isMobile ? 'none' : 'block' }}>
        <div className={`${style.guide} ${style.right}`}>
          <div className={style.up}>
            <em style={{ [transform]: 'translate(0,-3px) scale(1,2)' }} />
          </div>
          <div className={style.left}>
            <em style={{ [transform]: 'translate(-7px,3px) rotate(-90deg) scale(1,2)' }} />
          </div>
          <div className={style.down}>
            <em style={{ [transform]: 'translate(0,9px) rotate(180deg) scale(1,2)' }} /></div>
          <div className={style.right}>
            <em style={{ [transform]: 'translate(7px,3px)rotate(90deg) scale(1,2)' }} />
          </div>
        </div>
        <div className={`${style.guide} ${style.left}`}>
          <p>
            <a href="https://github.com/chvin/react-tetris" rel="noopener noreferrer" target="_blank" title={i18n.linkTitle[lan]}>{`${i18n.github[lan]}:`}</a><br />
            <iframe
              src="https://ghbtns.com/github-btn.html?user=chvin&repo=react-tetris&type=star&count=true"
              frameBorder="0"
              scrolling="0"
              width="170px"
              height="20px"
              style={{ [transform]: 'scale(1.68)', [`${transform}Origin`]: 'center left' }}
            />
            <br />
            <iframe
              src="https://ghbtns.com/github-btn.html?user=chvin&repo=react-tetris&type=fork&count=true"
              frameBorder="0"
              scrolling="0"
              width="170px"
              height="20px"
              style={{ [transform]: 'scale(1.68)', [`${transform}Origin`]: 'center left' }}
            />
          </p>
          <div className={style.space}>SPACE</div>
        </div>
        { this.state.QRCode !== '' ? (
          <div className={`${style.guide} ${style.qr}`}>
            <img
              src={this.state.QRCode}
              alt={i18n.QRCode[lan]}
            />
          </div>
        ) : null }
      </div>
    );
  }
}

