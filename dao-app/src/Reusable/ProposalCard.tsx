// TODO: receives created proposal from Proposal.tsx, outputs individually

import { Button, Card, CardActions, CardContent, Grid, Paper, Typography } from "@material-ui/core";
import { Proposal } from "../Proposal";
import '../scss/ProposalCard.scss';

// use npm react-countdown for 1 hours timer for each proposal
// Might need to use ProposalEvent[] to apply timer from timestamp
const ProposalCard = (proposal: any, key?: any) => {
  // const { proposals } = props;
    
      return (
        <Paper>
          <Grid item key={proposal.id} xs={12} sm={6} md={4} container direction={'row'}>
                <Card className="cardStyle">
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {proposal.id}
                    </Typography>
                    <Typography>
                      {proposal.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
          </Grid>
        </Paper>
      )
}

export default ProposalCard;