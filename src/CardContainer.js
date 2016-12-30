import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import Card from './Card';
import DraggableCard from './DraggableCard';

const cardTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },

  canDrop: function (props, monitor) {
    return (props.accepts.indexOf(monitor.getItem().card) !== -1
            || props.accepts === 'all');
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class CardContainer extends Component {

  addCardToCompleteContainer() {
    this.props.onDoubleClick(this.props);
  }

  render() {
    let {container, cards, connectDropTarget} = this.props;
    let overClass = this.getOverClass(this.props);

    return connectDropTarget(
      <div className={"cardContainer col7 pull-left " + overClass}
        onDoubleClick={this.addCardToCompleteContainer.bind(this)}
      >
        {cards.map(function(item) {
          return item.isVisible ?
            <DraggableCard
              container={container}
              card={item.card}
              isVisible={true}
              key={item.card}
            />:
            <Card
              container={container}
              card={item.card}
              isVisible={false}
              key={item.card}
            />
        })}
      </div>
    );
  }

  getOverClass(props) {
    if (props.isOver) {
      return props.canDrop ? 'canDropOn' : 'cantDropOn';
    }
    return '';
  }
}

CardContainer.propTypes = {
  canDrop: PropTypes.bool,
  isOver: PropTypes.bool
};

module.exports = DropTarget('card', cardTarget, collect)(CardContainer);
