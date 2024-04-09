import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class FileListToTextFile {

    public static void main(String[] args) {
        // Specify the path to the folder containing HTML files
        String folderPath = "C:\\Users\\ACER\\Accounts\\view\\app\\accounts\\app\\contr";

        // Specify the path to the output text file
        String outputFilePath = "C:\\Users\\ACER\\Desktop\\filenames.txt";

        try {
            // Create a File object for the specified folder
            File folder = new File(folderPath);

            // Get a list of files in the folder
            File[] files = folder.listFiles();

            // Check if the folder is not empty
            if (files != null) {
                // Create a FileWriter to write to the output text file
                FileWriter writer = new FileWriter(outputFilePath);
                // Loop through the files and write their names to the text file
                for (File file : files) {
                    if (file.isFile()) {
                        String fileName = file.getName();
                        // Remove the file extension
                        int lastDotIndex = fileName.lastIndexOf('.');
                        if (lastDotIndex > 0) {
                            fileName = fileName.substring(0, lastDotIndex);
                        }
                        // Write the file name to the text file
                        writer.write(fileName + System.lineSeparator());
                    }
                }
                // Close the FileWriter
                writer.close();
                System.out.println("File names have been saved to " + outputFilePath);
            } else {
                System.out.println("The folder is empty.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
