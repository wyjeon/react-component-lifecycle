import React, { Component } from 'react';

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  };

  myRef = null; // ref를 설정할 부분

  // 초기 state를 정할 수 있다.
  constructor(props) {
    super(props);
    console.log('constructor');
  }

  // props로 받아 온 값을 state 동기화시킨다.
  // mount, update될 때 호출
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps');
    if (nextProps.color !== prevState.color) {
      // 조건에 따라 특정 값 동기화
      return {
        color: nextProps.color,
      };
    }
    return null; // state를 변경할 필요가 없다면 null을 반환
  }

  // 컴포넌트를 만들기, 첫 렌더링을 마친 후 실행
  // 라이브러리, 프레임워크 함수 호출
  // 이벤트 등록
  // 비동기 작업 처리
  componentDidMount() {
    console.log('componentDidMount');
  }

  // props, state를 변경했을 때, 리렌더링 여부를 지정
  // 기본적으로 true 반환
  // false 반환 시 업데이트 과정 중지
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    return nextState.number % 10 !== 4; // 숫자 마지막 자리가 4면 리렌더링하지 않는다.
  }

  // 컴포넌틀을 DOM에서 제거할 때 실행
  // componentDidMount에서 등록한 이벤트, 타이머등을 여기서 제거
  conponentWillUnmount() {
    console.log('conponentWillUnmount');
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  // render에서 만들어지 결과물이 브라우저에 실제로 반영되기 직전에 호출
  // 반환 값은 componentDidUpdate에서
  //세 번째 파라미터인 snapshopt 값을 전달받을 수 있다.
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  // 리렌더링을 완료한 후 실행
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState);
    if (snapshot) {
      console.log('업데이트되기 직전 색상', snapshot);
    }
  }

  render() {
    console.log('render');

    const style = {
      color: this.props.color,
    };

    return (
      <div>
        {/*  {this.props.missing.value} */}
        <h1 style={style} ref={ref => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;
