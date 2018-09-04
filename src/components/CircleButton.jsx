import PropTypes from 'prop-types';
import styled from 'styled-components';
import React, { Component } from 'react';
import classNames from 'classnames';
import { MyContext } from './Context';
import CircleSvg from './CircleSvg';
import { randomSize, randomNumber, maxSize, minSize } from '../utils';
import styles from './CircleButton.css';
import { linearGradients } from './colors';

class CircleButton extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    isReset: PropTypes.bool,
  };

  state = {
    size: randomSize(),
    animationDelay: randomNumber(1, 5) * 500,
    isClicked: false,
    value: null,
  };

  componentDidMount() {
    const value = this.calculateValue();
    this.setState({ value });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isVisible !== this.props.isVisible) {
      this.setState({
        size: randomSize(),
        animationDelay: randomNumber(1, 5) * 500,
        isClicked: false,
      });
    }
  }

  calculateValue = () => {
    let value;
    switch (this.state.size) {
      case 100:
        value = 10;
        break;
      case 90:
        value = 20;
        break;
      case 80:
        value = 30;
        break;
      case 70:
        value = 40;
        break;
      case 60:
        value = 50;
        break;
      case 50:
        value = 60;
        break;
      case 40:
        value = 70;
        break;
      case 30:
        value = 80;
        break;
      case 20:
        value = 90;
        break;

      default:
        value = 100;
        break;
    }
    return value;
  };

  render() {
    const { isVisible, isReset } = this.props;
    const classList = classNames({
      [styles.slideDown]: isVisible && !isReset,
      [styles.noAnimation]: !isVisible && isReset,
      [styles.visibilityHidden]: this.state.isClicked,
      [styles.visibilityVisible]: !this.state.isClicked,
    });

    const visualSize = this.state.size * 1.25;

    return (
      <MyContext.Consumer>
        {context => (
          <RootButton
            animationDelay={this.state.animationDelay}
            animationDuration={context.state.animationDuration}
            className={classList}
            isPlaying={context.state.isPlaying}
            isVisible={isVisible}
            size={visualSize}
            onClick={() => {
              context.incrementScore(this.state.value);
              this.setState({ isClicked: true });
            }}
          >
            {this.state.value}
            <CircleSvg size={visualSize} isVisible={isVisible} />
          </RootButton>
        )}
      </MyContext.Consumer>
    );
  }
}

const RootButton = styled.button`
  animation-delay: ${props => props.animationDelay + 'ms'};
  animation-duration: ${props => props.animationDuration + 'ms'};
  animation-play-state: ${props => (props.isPlaying ? 'running' : 'paused')};
  animation-timing-function: linear;
  appearance: none;
  background: ${linearGradients.circle};
  border-radius: 100%;
  border: 2px solid white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  height: ${props => `${props.size}px`};
  padding: 0;
  margin: 5px;
  transition: all 100ms cubic-bezier(0.445, 0.05, 0.55, 0.95);
  width: ${props => `${props.size}px`};
  outline: none;
`;

export default CircleButton;