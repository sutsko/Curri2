import * as React from 'react';
import { List } from 'react-native-paper';
import { theme } from '../constants';

class Panel extends React.Component {
  state = {
    expanded: true
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  render() {
    return (
      <List.Section title="Dit Pensum" >
        <List.Accordion
        expanded={'true'}
        theme={{ colors: { primary: theme.colors.secondary } }}
          title="Class 1. Market Mechanisms and Government Policy "
          left={props => <List.Icon {...props} icon="video-plus" 
          
           
          />}
        >
          <List.Item title="Video: Supply and Demand." />
          <List.Item title="Video: Price Controls and Taxes." />
        </List.Accordion>
        
        <List.Accordion
        theme={{ colors: { primary: theme.colors.secondary } }}
          title="Class 2. Elasticities of Supply and Demand"
          left={props => <List.Icon {...props} icon="video-plus" />}
        >
          <List.Item title="Video: Societal Organization and Gains Through Trade." />
          <List.Item title="Video: Labor Market." />
        </List.Accordion>

        <List.Accordion
        theme={{ colors: { primary: theme.colors.secondary } }}
          title="Class 3. Policy applications "
          left={props => <List.Icon {...props} icon="video-plus" />}
        >
          <List.Item title="Video: Tariﬀs." />
          <List.Item title="Video: Import quotas." />
          <List.Item title="Video: Agricultural subsidies." />
          <List.Item title="Video: Economics of regulation."/>
        </List.Accordion>

        <List.Accordion
        theme={{ colors: { primary: theme.colors.secondary } }}
          title="Class 4. Theory of the Firm. "
          left={props => <List.Icon {...props} icon="video-plus" />}
        >
          <List.Item title="Video: Firm Equilibrium." />
          <List.Item title="Video: Pricing and Costs." />
        </List.Accordion>

        <List.Accordion
        theme={{ colors: { primary: theme.colors.secondary } }}
          title="Class 5. Break-Even Point and Price Discrimination."
          left={props => <List.Icon {...props} icon="video-plus" />}
        >
          <List.Item title="Video: Break-Even Point." />
          <List.Item title="Video: Price Discrimination." />
        </List.Accordion>

        <List.Accordion
        theme={{ colors: { primary: theme.colors.secondary } }}
          title="Class 6. Competition."
          left={props => <List.Icon {...props} icon="video-plus" />}
        >
          <List.Item title="Video: Perfect Competition." />
          <List.Item title="Video: Externalities." />
          <List.Item title="Video: Public Goods." />
        </List.Accordion>

        <List.Accordion
        theme={{ colors: { primary: theme.colors.secondary } }}
          title="Class 7. Coase theorem "
          left={props => <List.Icon {...props} icon="video-plus" />}
        >
          <List.Item title="Video: Design of micro government policy." />
          <List.Item title="Video: Product differentiation and price discrimination." />
          <List.Item title="Video: Welfare Economics." />
        </List.Accordion>

        <List.Accordion
        theme={{ colors: { primary: theme.colors.secondary } }}
          title="Class 8. Game theory . "
          left={props => <List.Icon {...props} icon="video-plus" />}
        >
          <List.Item title="Video: A Primer on Game Theory." />
          <List.Item title="Video: Competition and Cooperation." />
        </List.Accordion>

        <List.Accordion
        theme={{ colors: { primary: theme.colors.secondary } }}
          title="Class 9. Market Power"
          left={props => <List.Icon {...props} icon="video-plus" />}
        >
          <List.Item title="Video: Monopoly Pricing" />
          <List.Item title="Video: Static Models of Oligopoly" />
          <List.Item title="Video: - Bertrand, Cournot, Stackelberg" />
        </List.Accordion>

        <List.Accordion
          title="Exercises"
          left={props => <List.Icon {...props} icon="folder" />}
          expanded={this.state.expanded}
          onPress={this._handlePress}
        >
          <List.Item title="Market Power Exercise" />
          <List.Item title="Oligopoly Exercise" />
          <List.Item title="... 30 more" />
        </List.Accordion>
   
      </List.Section>
    );
  }
}

export default Panel;