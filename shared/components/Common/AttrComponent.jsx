import React, { PropTypes } from 'react';

class AttrComponent extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'AttrComponent';
  }
  render() {
    const renderComponent = () => {
      const itemDom = [];
      const grade = this.props.grade;
      const mainAttr = this.props.mainAttr;
      const subAttr = this.props.subAttr;
      let gradeLabel = null;
      let mainAttrLabel = null;
      let subAttrLabel = null;
      const endLabel = 'arrowed-in';
      const continueLabel = 'arrowed-in arrowed-right';
      if (grade === 'b') {
        if (subAttr !== '없음') {
          gradeLabel = <span key="1" className="label label-sm label-yellow arrowed-right" style={{ marginRight: '1px' }}>BA</span>;
        } else {
          gradeLabel = <span key="1" className="label label-sm label-yellow arrowed-right" style={{ marginRight: '1px' }}>BASIC</span>;
        }
      } else if (grade === 'a') {
        if (subAttr !== '없음') {
          gradeLabel = <span key="1" className="label label-sm label-adv arrowed-right" style={{ marginRight: '1px' }}>SP</span>;
        } else {
          gradeLabel = <span key="1" className="label label-sm label-adv arrowed-right" style={{ marginRight: '1px' }}>SPECIAL</span>;
        }
      } else if (grade === 'r') {
        if (subAttr !== '없음') {
          gradeLabel = <span key="1" className="label label-sm label-rare arrowed-right" style={{ marginRight: '1px' }}>RA</span>;
        } else {
          gradeLabel = <span key="1" className="label label-sm label-rare arrowed-right" style={{ marginRight: '1px' }}>RARE</span>;
        }
      } else if (grade === 'ar') {
        if (subAttr !== '없음') {
          gradeLabel = <span key="1" className="label label-sm label-advr arrowed-right" style={{ marginRight: '1px' }}>SR</span>;
        } else {
          gradeLabel = <span key="1" className="label label-sm label-advr arrowed-right" style={{ marginRight: '1px' }}>S.RARE</span>;
        }
      } else if (grade === 'e') {
        if (subAttr !== '없음') {
          gradeLabel = <span key="1" className="label label-sm label-elite arrowed-right" style={{ marginRight: '1px' }}>EL</span>;
        } else {
          gradeLabel = <span key="1" className="label label-sm label-elite arrowed-right" style={{ marginRight: '1px' }}>ELITE</span>;
        }
      } else if (grade === 'l') {
        if (subAttr !== '없음') {
          gradeLabel = <span key="1" className="label label-sm label-limited arrowed-right" style={{ marginRight: '1px' }}>LE</span>;
        } else {
          gradeLabel = <span key="1" className="label label-sm label-limited arrowed-right" style={{ marginRight: '1px' }}>LEGEND</span>;
        }
      }
      if (mainAttr === '노말') {
        mainAttrLabel = <span key="2" className={`label label-sm label-grey ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '불꽃') {
        mainAttrLabel = <span key="2" className={`label label-sm label-danger ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '물') {
        mainAttrLabel = <span key="2" className={`label label-sm label-primary ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '전기') {
        mainAttrLabel = <span key="2" className={`label label-sm label-warning ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '풀') {
        mainAttrLabel = <span key="2" className={`label label-sm label-success ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '얼음') {
        mainAttrLabel = <span key="2" className={`label label-sm label-info ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '비행') {
        mainAttrLabel = <span key="2" className={`label label-sm label-light ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '요정') {
        mainAttrLabel = <span key="2" className={`label label-sm label-pink ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '땅') {
        mainAttrLabel = <span key="2" className={`label label-sm label-inverse ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '독') {
        mainAttrLabel = <span key="2" className={`label label-sm label-purple ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '격투') {
        mainAttrLabel = <span key="2" className={`label label-sm label-fighter ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '염력') {
        mainAttrLabel = <span key="2" className={`label label-sm label-esper ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '벌레') {
        mainAttrLabel = <span key="2" className={`label label-sm label-bug ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '바위') {
        mainAttrLabel = <span key="2" className={`label label-sm label-rock ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '유령') {
        mainAttrLabel = <span key="2" className={`label label-sm label-ghost ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '용') {
        mainAttrLabel = <span key="2" className={`label label-sm label-dragon ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '악') {
        mainAttrLabel = <span key="2" className={`label label-sm label-evil ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      } else if (mainAttr === '강철') {
        mainAttrLabel = <span key="2" className={`label label-sm label-iron ${subAttr !== '없음' ? continueLabel : endLabel}`} style={{ marginLeft: '1px', marginRight: '1px' }}>{mainAttr}</span>; // eslint-disable-line
      }
      if (subAttr === '노말') {
        subAttrLabel = <span key="3" className="label label-sm label-grey arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '불꽃') {
        subAttrLabel = <span key="3" className="label label-sm label-danger arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '물') {
        subAttrLabel = <span key="3" className="label label-sm label-primary arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '전기') {
        subAttrLabel = <span key="3" className="label label-sm label-warning arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '풀') {
        subAttrLabel = <span key="3" className="label label-sm label-success arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '얼음') {
        subAttrLabel = <span key="3" className="label label-sm label-info arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '비행') {
        subAttrLabel = <span key="3" className="label label-sm label-light arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '요정') {
        subAttrLabel = <span key="3" className="label label-sm label-pink arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '땅') {
        subAttrLabel = <span key="3" className="label label-sm label-inverse arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '독') {
        subAttrLabel = <span key="3" className="label label-sm label-purple arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '격투') {
        subAttrLabel = <span key="3" className="label label-sm label-fighter arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '염력') {
        subAttrLabel = <span key="3" className="label label-sm label-esper arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '벌레') {
        subAttrLabel = <span key="3" className="label label-sm label-bug arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '바위') {
        subAttrLabel = <span key="3" className="label label-sm label-rock arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '유령') {
        subAttrLabel = <span key="3" className="label label-sm label-ghost arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '용') {
        subAttrLabel = <span key="3" className="label label-sm label-dragon arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '악') {
        subAttrLabel = <span key="3" className="label label-sm label-evil arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      } else if (subAttr === '강철') {
        subAttrLabel = <span key="3" className="label label-sm label-iron arrowed-in" style={{ marginLeft: '1px' }}>{subAttr}</span>;
      }
      itemDom.push(gradeLabel, mainAttrLabel, subAttrLabel);
      return itemDom;
    };
    return (
      <div>
        {renderComponent()}
      </div>
    );
  }
}

AttrComponent.propTypes = {
  mainAttr: PropTypes.string.isRequired,
  subAttr: PropTypes.string,
  grade: PropTypes.string.isRequired,
};

export default AttrComponent;
