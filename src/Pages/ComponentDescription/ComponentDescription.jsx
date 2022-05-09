import {
  Container,
  FormControl,
  Button,
  Input,
  styled,
  TextField,
  Box,
  Grid,
  Stack,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import React from "react";
import MyEditor from "../../components/myEditor/MyEditor";
import Upload from "../../components/UI/Upload/Upload";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const ComponentDescription = () => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const topFilms = [
    { title: "Button", year: 1994 },
    { title: "Card", year: 1972 },
    { title: "List", year: 1974 },
    { title: "Accordian", year: 2008 },
  ];

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...topFilms]);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);
  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const Input = styled("input")({
    display: "none",
  });
  return (
    <>
      <Container maxWidth="lg">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { my: 2 },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              fullWidth
              required
              spellCheck
            />
            <TextField
              id="subtitle"
              label="Substitle"
              variant="outlined"
              fullWidth
              spellCheck
            />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-around"
              spacing={2}
              sx={{ mb: "20px" }}
            >
              <label htmlFor="contained-button-file-js">
                <Input
                  accept=".js,.jsx,.ts,.tsx"
                  id="contained-button-file-js"
                  type="file"
                />
                <Button variant="contained" component="span" size="large">
                  Upload JavaScript
                </Button>
              </label>
              <label htmlFor="contained-button-file-css">
                <Input
                  accept=".css,.cssx,.scss,.sass"
                  id="contained-button-file-css"
                  type="file"
                />
                <Button variant="contained" component="span" size="large">
                  Upload CSS
                </Button>
              </label>
            </Stack>
            <Autocomplete
              id="asynchronous-demo"
              required
              multiple
              filterSelectedOptions
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              isOptionEqualToValue={(option, value) =>
                option.title === value.title
              }
              getOptionLabel={(option) => option.title}
              options={options}
              loading={loading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tags"
                  required
                  placeholder="Select tags"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />

            
          </FormControl>
        </Box>
        <MyEditor />
        <Upload />

      </Container>
    </>
  );
};

export default ComponentDescription;
