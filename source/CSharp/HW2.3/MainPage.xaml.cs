using Microsoft.Maui.Controls;
using Microsoft.Maui.Graphics;
using System;
using System.Linq;

namespace HW2._3
{
    public partial class MainPage : ContentPage
    {
        Entry kEntry, nEntry;
        Button generateButton;
        StackLayout histogramLayout;

        public MainPage()
        {

            Label kLabel = new Label
            {
                Text = "K:",
                VerticalOptions = LayoutOptions.Center
            };

            Label nLabel = new Label
            {
                Text = "N:",
                VerticalOptions = LayoutOptions.Center
            };

            kEntry = new Entry
            {
                Placeholder = "Insert K",
                Keyboard = Keyboard.Numeric
            };

            nEntry = new Entry
            {
                Placeholder = "Insert N",
                Keyboard = Keyboard.Numeric
            };

            generateButton = new Button
            {
                Text = "Generate Histogram"
            };
            generateButton.Clicked += GenerateHistogram;
            histogramLayout = new StackLayout
            {
                Orientation = StackOrientation.Horizontal,
                Spacing = 5
            };

            Content = new StackLayout
            {
                Padding = new Thickness(20),
                Children = {
                new StackLayout { Orientation = StackOrientation.Horizontal, Children = { kLabel, kEntry } },
                new StackLayout { Orientation = StackOrientation.Horizontal, Children = { nLabel, nEntry } },
                generateButton,
                histogramLayout
            }
            };
        }

    

    private void GenerateHistogram(object sender, EventArgs e)
        {
            // Rimuovi tutti gli elementi esistenti dalla histogramLayout
            histogramLayout.Children.Clear();

            if (int.TryParse(kEntry.Text, out int k) && int.TryParse(nEntry.Text, out int n))
            {
                if (k > 0 && n > 0)
                {
                    int[] histogram = GenerateRandomData(k, n);

                    double maxCount = histogram.Max();

                    for (int rangeIndex = 0; rangeIndex < k; rangeIndex++)
                    {
                        double normalizedHeight = (double)histogram[rangeIndex] / maxCount;
                        int barHeight = (int)(histogramLayout.Height * normalizedHeight);
                        histogramLayout.Children.Add(CreateBarAndLabel(rangeIndex, histogram[rangeIndex], barHeight, k));
                    }
                }
            }
        }

        private int[] GenerateRandomData(int k, int n)
        {
            int[] histogram = new int[k]; // Crea un array di interi di lunghezza k per rappresentare gli intervalli (range) dell'istogramma.
            Random rand = new Random(); // Crea un oggetto Random per generare numeri casuali.

            for (int i = 0; i < n; i++)
            {
                double randomValue = rand.NextDouble(); // Genera un numero casuale tra 0 e 1.
                int range = (int)(randomValue * k); // Calcola il range in cui il numero casuale rientra.
                if (range == k)
                    range--; // Se il numero casuale è esattamente 1, lo assegna all'ultimo range (k-1).
                histogram[range]++; // Incrementa il conteggio nel range corrispondente.
            }
            return histogram; // Restituisce l'array con i conteggi nei range.
        }




        private StackLayout CreateBarAndLabel(int rangeIndex, int count, int barHeight, int k)
        {
            Label barLabel = new Label
            {
                Text = $"Range: {rangeIndex * (1.0 / k)} - {(rangeIndex + 1) * (1.0 / k)}\nCount: {count}",
                HorizontalOptions = LayoutOptions.Center,
                VerticalOptions = LayoutOptions.End
            };
            BoxView bar = new BoxView
            {
                HeightRequest = barHeight,
                WidthRequest = 30,
                HorizontalOptions = LayoutOptions.Center
            };
            
            return new StackLayout { Children = { bar, barLabel } };
        }
    }
}
