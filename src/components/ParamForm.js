import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Card from '@material-ui/core/Card';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Info from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import DropZone from './DropZone';

const styles = theme => ({
    paper: {
	    margin: theme.spacing(0.5, 3),
	    display: 'stretch',
	    flexDirection: 'column',
	    alignItems: 'center',
  	},
  	root: {
    	height: '80vh',
    	background: theme.palette.common.white,
  	},
    form: {
	    width: '100%', // Fix IE 11 issue.
	    // marginTop: theme.spacing(0),
  	},
  	leftPane: {
  		borderRight: '1px solid lightgray',
  		marginBottom: '5px',
  	},
  	rightPane:{
  		borderLeft: '1px solid lightgray',
  		marginBottom: '5px',
  	},
  	formControl: {
	    // margin: theme.spacing(0),
	    minWidth: 120,
	},
	submit: {
        margin: theme.spacing(0,0,0),
        background: 'linear-gradient(45deg, #00274C 30%, #00274C 90%)',
        color: "#FFCB05",
        textTransform: "None",
        '&:hover': {
	      	background: '#FFCB05',
	      	color: "#00274C",
	      	// borderColor: '#0062cc',
	      	// boxShadow: 'none',
	    },
    },
    infoTitle: {
    	padding: '0px 24px',
    	marginTop: '4px'
    },
    infoContent: {
    	marginTop: '-6px'
    },
    input: {
    	// display: 'none',
  	},
  	uploadButton: {
  		backgroundColor: '#00274C',
  		textTransform: "None",
  		color: "#FFCB05",
  		'&:hover': {
	      	backgroundColor: '#FFCB05',
	      	color: "#00274C",
	      	// borderColor: '#0062cc',
	      	// boxShadow: 'none',
	    },
  	},
  	button: {
  		color: '#00274C',
  		marginTop: "-5px",
  		fill: '#FFCB05',
  		padding: '9px',
  	},
  	formField: {
  		margin: "0",
  		marginTop:"0px",
  		marginBottom: "10px",
  	},
  	previewChip: {
  		minWidth:160,
  		maxWidth:210,
  	},
});

const basicFields = [
	{
		id:'sampleIDs',
		label:'Sample IDs',
		value:'',
		placeholder:'Ex: 2444-1'
	},
	// {
	// 	id:'markerGenes',
	// 	label:'Initial Marker Genes',
	// 	value:'',
	// 	placeholder:'Ex: CDH5, EPCAM'
	// },
];

const qcFields = [
	{
		id:'minCells',
		label:'Min Cells',
		defaultValue:'0',
		helperText:'Remove genes expressed in fewer cells'
	},
	{
		id:'minGenes',
		label:'Min Genes',
		defaultValue:'500',
		helperText:'Remove cells expressing fewer genes'
	},
	{
		id:'maxGenes',
		label:'Max Genes',
		defaultValue:'7500',
		helperText:'Remove cells expressing more genes'
	},
	{
		id:'maxCounts',
		label:'Max Counts',
		defaultValue:'30000',
		helperText:'Remove cells with more unique molecular identifiers'
	},
	{
		id:'maxMito',
		label:'Max Mito',
		defaultValue:'0.1',
		helperText:'Remove cells with higher mitochondrail gene expression'
	}
]

const analysisFields = [
	{
		id:'n_neighbors',
		label:'N-Neighbors',
		defaultValue:'15',
		helperText:'Size of local neighborhood'
	},
	{
		id:'n_pcs',
		label:'PCs',
		defaultValue:'11',
		helperText:'# of principle components used in construction of neighborhood graph'
	},
	{
		id:'spread',
		label:'Spread',
		defaultValue:'1',
		helperText:'How clumped embedded points are'
	},
	{
		id:'min_dist',
		label:'Min Distance',
		defaultValue:'0.4',
		helperText:'Minimum distance between points on the cluster graph'
	},
	{
		id:'resolution',
		label:'Resolution',
		defaultValue:'0.1',
		helperText:'Number of clusters identified'
	}
]

class ParamForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleBasicFieldChange = this.handleBasicFieldChange.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleBasicFieldClickOpen = this.handleBasicFieldClickOpen.bind(this)
		this.handleBasicFieldClose = this.handleBasicFieldClose.bind(this)
		this.handleQCClickOpen = this.handleQCClickOpen.bind(this)
		this.handleQCClose = this.handleQCClose.bind(this)
		this.handleAnalysisFieldClickOpen = this.handleAnalysisFieldClickOpen.bind(this)
		this.handleAnalysisFieldClose = this.handleAnalysisFieldClose.bind(this)
		this.handleMiscFieldClickOpen = this.handleMiscFieldClickOpen.bind(this)
		this.handleMiscFieldClose = this.handleMiscFieldClose.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleUpload = this.handleUpload.bind(this)
		this.state = {
			basicFieldValues:['',''],
			qcFieldValues:['0','500','7500','30000','0.1'],
			analysisFieldValues:['15','11','1','0.4','0.1'],
			sampleIDs:'sample',
			markerGenes:'marker',
			umapCheck:false,
			tsneCheck:false,
			dotCheck:false,
			batchEffects:false,
			dotColor:'',
			dotGrouping:'',
			open:false,
			basicFieldOpen:false,
			qcopen:false,
			anopen:false,
			miscopen:false,
			submit:false,
		}
	}

	handleBasicFieldChange(value,i) {
		this.setState(prevState => {
			const tempVals = prevState.basicFieldValues;
			tempVals[i] = value;
			console.log(value)
			return{
				basicFieldValues: tempVals
			}
		})
	};

	handleQCFieldChange(value,i) {
		this.setState(prevState => {
			const tempVals = prevState.qcFieldValues;
			tempVals[i] = value;
			console.log(value)
			return{
				qcFieldValues: tempVals
			}
		})

	};

	handleAnalysisFieldChange(value,i) {
		this.setState(prevState => {
			const tempVals = prevState.analysisFieldValues;
			tempVals[i] = value;
			console.log(value)
			return{
				analysisFieldValues: tempVals
			}
		})

	};

	handleChange(e,name) {
		this.setState({[name]:e.target.checked});
	};

	handleClickOpen(e) {
	    this.setState({open:true});
	  }

	handleClose(e) {
	    this.setState({open:false});
	  };

	handleMiscFieldClickOpen(e) {
	    this.setState({miscopen:true});
	  }

	handleMiscFieldClose(e) {
	    this.setState({miscopen:false});
	  };

	handleBasicFieldClickOpen(e) {
	    this.setState({basicFieldOpen:true});
	 }

	handleBasicFieldClose(e) {
	    this.setState({basicFieldOpen:false});
	  };

	handleQCClickOpen(e) {
	    this.setState({qcopen:true});
	}

	handleQCClose(e) {
	    this.setState({qcopen:false});
	};

	handleAnalysisFieldClickOpen(e) {
	    this.setState({anopen:true});
	}

	handleAnalysisFieldClose(e) {
	    this.setState({anopen:false});
	};

	handleSubmit(e) {
		const data = {
			sample_list: this.state.basicFieldValues[0],
			gene_list: this.state.basicFieldValues[1],
			min_cells: this.state.qcFieldValues[0],
			min_genes: this.state.qcFieldValues[1],
			max_counts: this.state.qcFieldValues[2],
			max_mito: this.state.qcFieldValues[3],
			n_neighbors: this.state.analysisFieldValues[0],
			n_pcs: this.state.analysisFieldValues[1],
			spread: this.state.analysisFieldValues[2],
			min_dist: this.state.analysisFieldValues[3],
			resolution: this.state.analysisFieldValues[4]
		}

		// call to api
		this.setState({submit:true});

		fetch('http://localhost:5000/submit', {
		  method: 'POST', // or 'PUT'
		  headers: {
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(data), 
		})
	}

	handleUpload(e) {
		const data =  {data_test: 0}
		fetch('http://localhost:5000/upload', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})

	}

	render() {
		const {classes} = this.props;

		return(
			<Grid container component="main" alignItems='stretch' justify="center" spacing={1}>
			  	<Grid item xs={4} sm={4} md={4}  component={Paper} className={classes.leftPane}>
			  		<Container>
			  			<Typography variant="h7" color="inherit" noWrap>
			      			Basic Information
			    		</Typography>
			    		<IconButton className={classes.button} aria-label="info" onClick={this.handleBasicFieldClickOpen}>
			    			<Info fontSize="small" className={classes.iconInfo}/>
			    		</IconButton>
			    		<Dialog onClose={this.handleBasicFieldClose} aria-labelledby="simple-dialog-title" open={this.state.basicFieldOpen}>
					        <DialogTitle id="simple-dialog-title" className={classes.infoTitle}>Basic Fields</DialogTitle>
					        <DialogContent className={classes.infoContent}>
						        <b>Sample IDs</b> - Metadata file run number of the samples to be analyzed
						        <br />
						        <b>Gene List</b> - List of genes to plot in UMAP feature plots, dot plots, etc.
						        <br />
					        </DialogContent>
					    </Dialog>
						{basicFields.map((field,i) => (
							<TextField
						        id={field.id}
						        label={field.label}
						        type="search"
						        value={this.state.basicFieldValues[i]}
						        //onClick={e=>this.setState({basicFieldValue:['']})}
						        onChange={(e)=>{
						        		this.handleBasicFieldChange(e.target.value,i);
						        		//console.log(e.target.value)
						        	}
						        }
						        className={classes.formField}
						        placeholder={field.placeholder}
						        fullWidth
						        margin="normal"
						        InputLabelProps={{
						        	shrink: true,
						        }}
							/>))}
						{/*<DropzoneAreaBase
							showPreviews={true}
							showPreviewsInDropzone={false}
							useChipsForPreview
							filesLimit={1}
							Icon={False}
							// dropzoneClass={classes.}
							dropzoneText={"Upload Gene List"}
							acceptedFiles={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
							previewGridProps={{container: { spacing: 1, direction: 'row' }}}
							previewChipProps={{classes: { root: classes.previewChip } }}
							previewText="Selected files"
						/>*/}
						{/*<input
					        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					        className={classes.input}
					        id="contained-button-file"
					        type="file"
					        hidden
					    />
					    <label htmlFor="contained-button-file">
						    <Button variant="contained" className = {classes.uploadButton} onClick = {this.handleUpload} component="span">
						        Upload Gene List
						    </Button>
					    </label>*/}
					    <DropZone />
			  			<Typography variant="h7" color="inherit">
			      			Quality Control Parameters
			    		</Typography>
			    		<IconButton className={classes.button} aria-label="info" onClick={this.handleQCClickOpen}>
			    			<Info fontSize="small"/>
			    		</IconButton>
			    		<Dialog onClose={this.handleQCClose} aria-labelledby="simple-dialog-title" open={this.state.qcopen}>
					        <DialogTitle id="simple-dialog-title" className={classes.infoTitle}>Quality Control Parameters</DialogTitle>
					        <DialogContent className={classes.infoContent}>
						        <b>Min cells</b> - Filter out genes with a few number of cells
						        <br />
								<b>Min genes</b> - Filter out cells with fewer genes to remove dead cells
								<br />
								<b>Max genes</b> - Filter out cells with more genes to remove most doublets
								<br />
								<b>Max counts</b> - Filter out cells with more UMIs to catch a few remaining doublets
								<br />
								<b>Max mito</b> - Filter out cells with high mitochondrial gene transcript fraction
					        </DialogContent>
					    </Dialog>

						<Grid container spacing={1}>
			    			{qcFields.map((field,i) =>(
			    				<Grid item xs={6} sm={4}>
				    				<TextField
								        id={field.id}
								        label={field.label}
								        className={classes.formField}
								        value={this.state.qcFieldValues[i]}
								        onChange={(e)=>{this.handleQCFieldChange(e.target.value,i)}}
								        defaultValue={field.defaultValue}
								        //helperText={field.helperText}
								        fullWidth
								        margin="normal"
								        InputLabelProps={{
								        	shrink: true,
								        }}
								    />
							    </Grid>
							))}
						</Grid>

						<Typography variant="h7" color="inherit">
			      			Analysis Parameters
			    		</Typography>
			    		<IconButton className={classes.button} aria-label="info" onClick={this.handleAnalysisFieldClickOpen}>
			    			<Info fontSize="small"/>
			    		</IconButton>
			    		<Dialog onClose={this.handleAnalysisFieldClose} aria-labelledby="simple-dialog-title" open={this.state.anopen}>
					        <DialogTitle id="simple-dialog-title" className={classes.infoTitle}>Analysis Parameters</DialogTitle>
					        <DialogContent className={classes.infoContent}>
						        <b>Nearest Neighbors </b> - Size of the local neighborhood used for manifold approximation
						        <br/>
								<b>Principle Components </b> - Number of principle components to use in construction of neighborhood graph
								<br />
								<b>Spread </b> - In combination with min_dist determines how clumped embedded points are
								<br />
								<b>Min Distance </b> - Minimum distance between points on the UMAP plot
								<br />
								<b>Resolution </b> - High resolution attempts to increases # of clusters identified
					        </DialogContent>
					    </Dialog>
			    		<Grid container spacing={1}>
			    			{analysisFields.map((field,i) =>(
			    				<Grid item xs={6} sm={4}>
				    				<TextField
								        id={field.id}
								        label={field.label}
								        className={classes.formField}
								        value={this.state.analysisFieldValues[i]}
								        onChange={(e)=>{this.handleAnalysisFieldChange(e.target.value,i)}}
								        defaultValue={field.defaultValue}
								        //helperText={field.helperText}
								        fullWidth
								        margin="normal"
								        InputLabelProps={{
								        	shrink: true,
								        }}
								    />
							    </Grid>
							))}
						</Grid>


			  		</Container>
			  		<br/>
			  	</Grid>

			  	<Grid item xs={8} sm={8} md={8} component={Paper} className={classes.rightPane}>
				  	<Container>
				  		<Typography variant="h7" color="inherit" noWrap>
				      		Extra Analysis Options
				    	</Typography>
				    	<IconButton className={classes.button} aria-label="info" onClick={this.handleMiscFieldClickOpen}>
			    			<Info fontSize="small"/>
			    		</IconButton>
			    		<Dialog onClose={this.handleMiscFieldClose} aria-labelledby="simple-dialog-title" open={this.state.miscopen}>
					        <DialogTitle id="simple-dialog-title" className={classes.infoTitle}>Extra Analysis Options</DialogTitle>
					        <DialogContent className={classes.infoContent}>
						        <b>Nearest Neighbors </b> - Size of the local neighborhood used for manifold approximation
						        <br/>
								<b>Principle Components </b> - Number of principle components to use in construction of neighborhood graph
								<br />
								<b>Spread </b> - In combination with min_dist determines how clumped embedded points are
								<br />
								<b>Min Distance </b> - Minimum distance between points on the UMAP plot
								<br />
								<b>Resolution </b> - High resolution attempts to increases # of clusters identified
					        </DialogContent>
					    </Dialog>
				    	<Grid container spacing={1}>
				    		<Grid item xs={6} sm={4}>
					    		<FormControlLabel
									control={<Checkbox 
												color="secondary" 
												checked={this.state.dotCheck} 
												onChange={e=>this.setState({dotCheck:e.target.checked})}
											/>}
									label="Dot Plot"
								/>
				    		</Grid>
				    		<Grid item xs={6} sm={4}>
					    		<FormControlLabel
									control={<Checkbox 
												color="secondary" 
												checked={this.state.tsneCheck} 
												onChange={e=>this.setState({tsneCheck:e.target.checked})}
											/>}
									label="t-SNE"
								/>
				    		</Grid>
				    		<Grid item xs={6} sm={4}>
					    		<FormControlLabel
									control={<Checkbox 
												color="secondary" 
												checked={this.state.umapCheck} 
												onChange={e=>this.setState({umapCheck:e.target.checked})}
											/>}
									label="Doublet Detection"
								/>
				    		</Grid>
				    		<Grid item xs={6} sm={4}>
					    		<FormControlLabel
									control={<Checkbox 
												color="secondary" 
												checked={this.state.batchEffects} 
												onChange={e=>this.setState({batchEffects:e.target.checked})}
											/>}
									label="Batch Correct"
								/>
				    		</Grid>
				    	</Grid>

					  	<Grid container spacing={1}>
					  		<Grid item sm={12} m={12} lg={12}>
							  	{this.state.dotCheck && <Card>
							        <ExpansionPanel square>
								        <ExpansionPanelSummary aria-controls="panel1a-content" id="panel1a-header">
								          	<Typography className={classes.heading}>
								          		Additional Dot Plot Options
									          	<IconButton className={classes.button} aria-label="info" onClick={this.handleClickOpen}>
									    			<Info fontSize="small"/>
									    		</IconButton>
									        </Typography>
								        </ExpansionPanelSummary>
								        <ExpansionPanelDetails>
								        	<Grid container spacing={1}>
									        	<Grid item xs={6}>
										          	<FormControl className={classes.formControl}>
												        <InputLabel shrink htmlFor="age-simple">Color Map</InputLabel>
												        <Select
														    value={this.state.dotColor}
														    onChange={e=>this.setState({dotColor:e.target.value})}
														    inputProps={{
													            name: 'age',
													            id: 'age-simple',
												            }}
												        >
															<MenuItem value="Blue-Orange">Blue-Orange</MenuItem>
															<MenuItem value={20}>Twenty</MenuItem>
															<MenuItem value={30}>Thirty</MenuItem>
												        </Select>
												    </FormControl>
											    </Grid>
											    <Grid item xs={2}>
										          	<FormControl className={classes.formControl}>
												        <InputLabel shrink htmlFor="age-simple">Grouping</InputLabel>
												        <Select
													        value={this.state.dotGrouping}
													        onChange={e=>this.setState({dotGrouping:e.target.value})}
													        inputProps={{
																name: 'age',
																id: 'age-simple',
													        }}
												        >
															<MenuItem value="Louvain">Louvain</MenuItem>
															<MenuItem value={20}>Twenty</MenuItem>
															<MenuItem value={30}>Thirty</MenuItem>
												        </Select>
												    </FormControl>
											    </Grid>
											    <Grid item xs={3}>
												    <TextField
												        id="geneList"
												        label="Positions and Labels"
												        style={{ margin: 8 }}
												        defaultValue="Epithelial - (0,3)"
												        fullWidth
												        margin="normal"
												        InputLabelProps={{
												        	shrink: true,
												        }}
												    />
											    </Grid>
											    <Grid item xs={3}>
												    <TextField
												        id="geneList"
												        label="Dot Max"
												        style={{ margin: 8 }}
												        defaultValue="1"
												        fullWidth
												        margin="normal"
												        InputLabelProps={{
												        	shrink: true,
												        }}
												    />
											    </Grid>
										    </Grid>
								        </ExpansionPanelDetails>
								    </ExpansionPanel>
						   		</Card>}
					   		</Grid>
				    	</Grid>
				    </Container>
			  		
			  	</Grid>
			  	<Button
	          	   	fullWidth
	      			type="submit"
	      			variant="contained"
	      			color="secondary"
	      			className={classes.submit}
	                onClick={this.handleSubmit}
	            >
				    Run Analysis
		        </Button>
			</Grid>
		);
	}
}

export default withStyles(styles)(ParamForm);

{/*<Grid item sm={12} m={12} lg={12}>
					  	{this.state.tsneCheck && <Card>
					        <ExpansionPanel square>
						        <ExpansionPanelSummary
						          aria-controls="panel1a-content"
						          id="panel1a-header"
						        >
						          <Typography className={classes.heading}>Additional t-SNE Plot Options</Typography>
						        </ExpansionPanelSummary>
						        <ExpansionPanelDetails>
						          	<TextField
								        id="maxMito"
								        label="Max Mito"
								        style={{ margin: 8 }}
								        defaultValue="0.1"
								        helperText="Remove cells with higher mitochondrial gene expression"
								        fullWidth
								        margin="normal"
								        InputLabelProps={{
								        	shrink: true,
								        }}
								    />
						        </ExpansionPanelDetails>
						    </ExpansionPanel>
				   		</Card>}
				   		</Grid>
				   		<Grid item sm={12} m={12} lg={12}>
				   		{this.state.umapCheck && <Card>
					        <ExpansionPanel square>
						        <ExpansionPanelSummary
						          aria-controls="panel1a-content"
						          id="panel1a-header"
						        >
						          <Typography className={classes.heading}>Additional UMAP Plot Options</Typography>
						        </ExpansionPanelSummary>
						        <ExpansionPanelDetails>
						          	<TextField
								        id="maxMito"
								        label="Max Mito"
								        style={{ margin: 8 }}
								        defaultValue="0.1"
								        helperText="Remove cells with higher mitochondrial gene expression"
								        fullWidth
								        margin="normal"
								        InputLabelProps={{
								        	shrink: true,
								        }}
								    />
						        </ExpansionPanelDetails>
						    </ExpansionPanel>
				   		</Card>}
				   		</Grid>
				   		<Grid item sm={12} m={12} lg={12}>
					  	{this.state.batchEffects && <Card>
					        <ExpansionPanel square>
						        <ExpansionPanelSummary
						          aria-controls="panel1a-content"
						          id="panel1a-header"
						        >
						          	<Typography className={classes.heading}>
						          		Additional Violin Plot Options
						          	</Typography>
						        </ExpansionPanelSummary>
						        <ExpansionPanelDetails>
						        	<Grid container>

						          	<FormControl className={classes.formControl}>
								        <InputLabel htmlFor="age-simple">Age</InputLabel>
								        <Select
								          value={this.state.dotColor}
								          onChange={e=>this.setState({dotColor:e.target.value})}
								          inputProps={{
								            name: 'age',
								            id: 'age-simple',
								          }}
								        >
								          <MenuItem value={10}>Ten</MenuItem>
								          <MenuItem value={20}>Twenty</MenuItem>
								          <MenuItem value={30}>Thirty</MenuItem>
								        </Select>
								    </FormControl>
								    </Grid>
						        </ExpansionPanelDetails>
						    </ExpansionPanel> 
				   		</Card>}
				   		</Grid>*/}
