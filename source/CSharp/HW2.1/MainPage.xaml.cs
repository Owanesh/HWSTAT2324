namespace HW2._1
{
    public partial class MainPage : ContentPage
    {
        private string filePath;
        private string fileContent;
        private Button analyzeButton;
        private ScrollView scrollView;

        public MainPage()
        {
            InitializeComponent();
            CreateUI();
        }

        private void CreateUI()
        {
            var chooseFileButton = new Button
            {
                Text = "Scegli il file",
                HorizontalOptions = LayoutOptions.CenterAndExpand,
                VerticalOptions = LayoutOptions.CenterAndExpand
            };
            chooseFileButton.Clicked += OnChooseFileButtonClicked;

            analyzeButton = new Button
            {
                Text = "Analizza il file",
                HorizontalOptions = LayoutOptions.CenterAndExpand,
                VerticalOptions = LayoutOptions.CenterAndExpand,
                IsEnabled = false, // Disabilita il pulsante inizialmente
                IsVisible = false,
            };
            analyzeButton.Clicked += OnAnalyzeButtonClicked;

            var stackLayout = new StackLayout
            {
                Children = { chooseFileButton, analyzeButton }
            };

            scrollView = new ScrollView
            {
                Content = stackLayout,
                Margin = new Thickness(10)
            };

            Content = scrollView;
        }



        private void OnAnalyzeButtonClicked(object sender, EventArgs e)
        {
            if (!string.IsNullOrEmpty(filePath) && !string.IsNullOrEmpty(fileContent))
            {
                var columnFrequencies = ParseTsv(fileContent);

                Content = CreateResultPage(columnFrequencies);
            }
            else
            {
                // Gli oggetti filePath e fileContent non sono stati inizializzati correttamente
            }
        }

        private async void OnChooseFileButtonClicked(object sender, EventArgs e)
        {
            try
            {
                var result = await FilePicker.PickAsync();

                if (result != null)
                {
                    filePath = result.FullPath;
                    fileContent = string.Empty;

                    using (StreamReader reader = new StreamReader(filePath))
                    {
                        fileContent = reader.ReadToEnd();
                    }

                    if (!string.IsNullOrEmpty(fileContent))
                    {
                        // Attiva il pulsante "Analizza il file" solo se il file è stato caricato con successo
                        analyzeButton.IsEnabled = true;
                        analyzeButton.IsVisible = true;

                    }
                }
                else
                {
                    // L'utente ha annullato la selezione del file o si è verificato un errore.
                }
            }
            catch (Exception ex)
            {
                // Gestisci eventuali eccezioni qui
            }
        }


        private Dictionary<string, Dictionary<string, int>> ParseTsv(string content)
        {
            var columnFrequencies = new Dictionary<string, Dictionary<string, int>>();

            // Dividi il contenuto del file TSV in righe
            string[] lines = content.Split('\n');

            if (lines.Length < 2)
            {
                // Il file TSV deve contenere almeno due righe (intestazione e dati)
                return columnFrequencies;
            }

            // Dividi la prima riga (intestazione) in colonne
            string[] headers = lines[0].Split('\t');

            foreach (var header in headers)
            {

                columnFrequencies[header] = new Dictionary<string, int>();
            }

            // Analizza le righe dei dati
            for (int i = 1; i < lines.Length; i++)
            {
                string[] data = lines[i].Split('\t');
                for (int j = 0; j < headers.Length; j++)
                {
                    string columnName = headers[j];
                    string cellValue = data[j].Trim();

                    if (!columnFrequencies[columnName].ContainsKey(cellValue))
                    {
                        columnFrequencies[columnName][cellValue] = 1;
                    }
                    else
                    {
                        columnFrequencies[columnName][cellValue]++;
                    }
                }
            }

            return columnFrequencies;
        }

        private ScrollView CreateResultPage(Dictionary<string, Dictionary<string, int>> columnFrequencies)
        {
            var stackLayout = new StackLayout();

            foreach (var header in columnFrequencies.Keys)
            {
                if (header.ToUpper() != "Hard Worker (0-5)".ToUpper() && header.ToUpper() != "Background (degree)".ToUpper() && header.ToUpper() != "Age".ToUpper())
                    continue;

                var frame = new Frame
                {
                    BorderColor = Colors.Black,
                    Margin = new Thickness(0, 0, 0, 10)
                };

                var tableView = new TableView
                {
                    Root = new TableRoot(header)
                };

                var tableSection = new TableSection();
                var rowCount = 0;

                // Calcola la somma delle frequenze
                int totalFrequency = columnFrequencies[header].Values.Sum();

                foreach (var item in columnFrequencies[header])
                {
                    var cell = new TextCell
                    {
                        Text = item.Key,
                        Detail = $"Abs: {item.Value} (Relative: {(double)item.Value / totalFrequency}, Percentual: {(double)item.Value / totalFrequency:P0})",
                    };

                   

                    tableSection.Add(cell);

                    rowCount++;
                    if (rowCount >= 10)
                    {
                        break;
                    }
                }

                tableView.Root.Add(tableSection);
                frame.Content = tableView;
                stackLayout.Children.Add(new Label { Text = header, FontAttributes = FontAttributes.Bold });
                stackLayout.Children.Add(frame);
            }

            var resultScrollView = new ScrollView
            {
                Content = stackLayout
            };

            return resultScrollView;
        }



    }
}