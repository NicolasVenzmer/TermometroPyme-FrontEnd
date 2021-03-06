import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import Page from 'material-ui-shell/lib/containers/Page/Page'
import "./Contacto.css";
import Footer from '../Footer/Footer';
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TimelineIcon from '@material-ui/icons/Timeline';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router';
import banner from '../../imagenes/banner2.jpg';

//importo llamada a endpoint
import { guardarContacto } from "../../controller/miApp.controller";
import { getEncuestaID } from "../../controller/miApp.controller";

const useStylesButton = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    width: "98%",
  },
}));

const useStylesCards = makeStyles({
  root: {
    width: "98%",
    margin: '0 10px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const useStylesText = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

const useStylesGrid = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    width: "98%",
    margin: "0 10px",
    color: theme.palette.text.secondary,
  },
}));

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Encuesta(props) {
  const clase1 = useStylesCards();
  const clase3 = useStylesText();
  const clase4 = useStylesButton();
  const [encuestas, setEncuestas] = useState([]);
  const clase5 = useStylesGrid();
  const classes = useStyles();
  const [region, setRegion] = React.useState('');

  const history = useHistory();
  const [razonsocial, setRazonSocial] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [tama??o, setTama??o] = React.useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }
  const handleRazonSocial = (event) => {
    setRazonSocial(event.target.value);
  }

  const handleTama??o = (event) => {
    setTama??o(event.target.value);
  }
  const isEmpty = (stringToValidate) => {
    if (stringToValidate !== undefined && stringToValidate !== null) {
      return stringToValidate.length === 0
    }
    return true;
  };

  const handleChange = (event) => {
    setRegion(event.target.value);
  };

  useEffect(() => {
    getEncuesta(props.match.params.id)
  }, [props.match.params.id]);

  const getEncuesta = async (id) => {
    const encuestas = await getEncuestaID(id)
    setEncuestas(encuestas[0])
  };

  const subirDatos = async function () {
    let archivoDatos = false;

    const validateValidEmail = (stringToValidate) => {

      if (typeof stringToValidate !== undefined) {
        let lastAtPos = stringToValidate.lastIndexOf('@');
        let lastDotPos = stringToValidate.lastIndexOf('.');
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && stringToValidate.indexOf('@@') === -1 && lastDotPos > 2 && (stringToValidate.length - lastDotPos) > 2)) {
          return stringToValidate.length === 0
        }
      }
      return true;
    };

    if (!isEmpty(razonsocial) && !isEmpty(region) && validateValidEmail(email) && !isEmpty(tama??o)) {
      archivoDatos = await guardarContacto(razonsocial, email, region, tama??o);
    }
    else {
      alert("Verificar que los datos esten completados correctamente")
    }

    return archivoDatos
  }

  const redirect = async () => {
    const ok = await subirDatos()
    if (ok) {
      history.push("/Resultados/"+ encuestas._id)
    }
  }

  return (
    <Page pageTitle={'API Benchmark - Observatorio Pyme'}>
      <Scrollbar style={{ height: '93.4%', width: '100%', display: 'flex', flex: 1 }}>
        <img src={banner} width="100%" height="25%" alt="Logo" />
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={clase5.paper}><h2>Informaci??n de contacto</h2></Paper>
          </Grid>
        </Grid>
        <br />
        <Card className={clase1.root}>
          <CardContent>
            <form className={clase3.root} autoComplete="off">
              <TextField
                required
                id="RazonSocial"
                label="Razon social"
                inputProps={{
                  onChange: (event) => handleRazonSocial(event),
                }}
              />
              <TextField
                required
                id="email"
                label="Correo electronico"
                inputProps={{
                  onChange: (event) => handleEmail(event),
                }}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Region *</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={region}
                  onChange={handleChange}
                >
                  <MenuItem value={"Buenos Aires"}>Buenos Aires</MenuItem>
                  <MenuItem value={"Ciudad Autonoma de Buenos Aires"}>Cuidad Autonoma de Buenos Aires</MenuItem>
                  <MenuItem value={"Catamarca"}>Catamarca</MenuItem>
                  <MenuItem value={"Chaco"}>Chaco</MenuItem>
                  <MenuItem value={"Chubut"}>Chubut</MenuItem>
                  <MenuItem value={"C??rdoba"}>C??rdoba</MenuItem>
                  <MenuItem value={"Corrientes"}>Corrientes</MenuItem>
                  <MenuItem value={"Entre R??os"}>Entre R??os</MenuItem>
                  <MenuItem value={"Formosa"}>Formosa</MenuItem>
                  <MenuItem value={"Jujuy"}>Jujuy</MenuItem>
                  <MenuItem value={"La Pampa"}>La Pampa</MenuItem>
                  <MenuItem value={"La Rioja"}>La Rioja</MenuItem>
                  <MenuItem value={"Mendoza"}>Mendoza</MenuItem>
                  <MenuItem value={"Misiones"}>Misiones</MenuItem>
                  <MenuItem value={"Neuqu??n"}>R??o Negro</MenuItem>
                  <MenuItem value={"R??o Negro"}>R??o Negro</MenuItem>
                  <MenuItem value={"Salta"}>Salta</MenuItem>
                  <MenuItem value={"San Juan"}>San Juan</MenuItem>
                  <MenuItem value={"San Luis"}>San Luis</MenuItem>
                  <MenuItem value={"Santa Cruz"}>Santa Cruz</MenuItem>
                  <MenuItem value={"Santa Fe"}>Santa Fe</MenuItem>
                  <MenuItem value={"Santiago del Estero"}>Santiago del Estero</MenuItem>
                  <MenuItem value={"Tierra del Fuego, Ant??rtida e Isla del Atl??ntico Sur"}>Tierra del Fuego, Ant??rtida e Isla del Atl??ntico Sur</MenuItem>
                  <MenuItem value={"Tucum??n"}>Tucum??n</MenuItem>
                </Select>
              </FormControl>
            </form>
            <br /> <br />
            <FormControl component="fieldset">
              <FormLabel component="legend">Tama??o de su empresa *</FormLabel>
              <RadioGroup onChange={handleTama??o}>
                <FormControlLabel required value="Peque??a" control={<Radio />} label="Peque??a: < 50 empleados" />
                <FormControlLabel required value="Mediana" control={<Radio />} label="Mediana: < 250 empleados" />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
        <Button
          variant="contained"
          color="Primary"
          className={clase4.button}
          startIcon={<TimelineIcon />}
          onClick={() => { redirect() }}
        >
          Generar resultados
      </Button>
      </Scrollbar>
      <Footer />
    </Page>
  );
}