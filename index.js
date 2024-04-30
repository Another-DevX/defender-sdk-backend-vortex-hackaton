
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;
app.get('/prove', async (req, res) => {
  const result = await client.monitor.listBlockwatchers();
  console.log(result);
  res.send(result);
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
