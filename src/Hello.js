import React from "react";
import PropTypes from "prop-types";
import {
  withStyles
} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const names = [
  "All",
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder"
];

class MultipleSelect extends React.Component {
    state = {
      name: [],
      lastChecked: null
    };

    handleChange = event => {

      var clickedItem = event.currentTarget.attributes['data-value'].nodeValue
      var selectedItems = event.target.value
      console.log(selectedItems)
      if (clickedItem === 'All') {
        if (selectedItems.length < names.length - 1) {
          this.setState({
            name: names,
            lastChecked: null
          });
        } else {
          this.setState({
            name: [],
            lastChecked: null
          });
        }
      } else {
        var index = selectedItems.indexOf('All');
        if (index > -1) {
          selectedItems.splice(index, 1)
        }

        if(event.shiftKey && this.state.lastChecked){
            var startIndex = names.indexOf(this.state.lastChecked);
            var endIndex = names.indexOf(clickedItem);
            selectedItems = selectedItems.concat(names.slice(startIndex, endIndex))
        }
        this.setState({
          name: selectedItems,
          lastChecked: clickedItem
        });
      }
    };

    handleDelete = data => () => {
      const chipData = [...this.state.name];
      if (data === 'All') {
        this.setState({name: []})
      } else {
        const chipToDelete = chipData.indexOf(data);
        chipData.splice(chipToDelete, 1);
        const allIndex = chipData.indexOf('All');
        if(allIndex > -1){
          chipData.splice(allIndex, 1)
        }
        this.setState({
          name: chipData
        });
      }
    };

    render() {
      const {
        classes,
        theme
      } = this.props;

      return <div className = {
          classes.root
        }>
        <FormControl className = {
          classes.formControl
        } >
        <InputLabel htmlFor = "select-multiple-checkbox" > 
        Facility 
        </InputLabel> 
        <Select multiple value = {
          this.state.name
        }
      onChange = {
        this.handleChange
      }
      input = { < Input id = "select-multiple-checkbox" />
      }
      renderValue = {
        selected => <div
        className = {
          classes.chips
        }>
        {
          selected.map(value => ( 
            <Chip key = {
              value
            }
            label = {
              value
            }
            className = {
              classes.chip
            }
            onDelete = {
              this.handleDelete(value)
            }
            />
          ))
        } </div>} 
        MenuProps={MenuProps}> {
          names.map(name => ( 
            <MenuItem key = {
              name
            }
            value = {
              name
            }
            style = {
              {
                fontWeight: this.state.name.indexOf(name) === -1 ?
                  theme.typography.fontWeightRegular :
                  theme.typography.fontWeightMedium
              }
            }>
            <Checkbox checked = {
              this.state.name.indexOf(name) > -1
            }
            /> 
            <ListItemText primary = {
              name
            }
            /> 
            </MenuItem>
          ))
        } 
        </Select> 
        </FormControl> 
        </div>;
      }
    }

    MultipleSelect.propTypes = {
      classes: PropTypes.object.isRequired,
      theme: PropTypes.object.isRequired
    };

    export default withStyles(styles, {
      withTheme: true
    })(MultipleSelect);