import React, { Component } from 'react';

class Deck extends Component {

  deal() {
    this.props.onClick();
  }

  render() {
    let {remainingCards} = this.props;

    return (
      <div className="col7" onClick={this.deal.bind(this)}>
        <div className="exchange pointer" style={{borderTop: (remainingCards / 3)+ 'px solid #565656'}}>
          <div className="remaining noselect">
            {remainingCards}
          </div>
        </div>
      </div>
    );
  }
}

export default Deck;
