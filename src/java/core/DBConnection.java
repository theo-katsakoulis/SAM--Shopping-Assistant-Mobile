package core;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    
    private static final String url = "jdbc:derby://localhost:1527/SAM;restoreFrom=c:/DATABASE/SAM";
    //private static final String databaseName = "A3";
    //private static final int port = 1527;
    //private static final String username = "exercise3";
    //private static final String password = "exercise3";

    /**
     * Attempts to establish a database connection
     *
     * @return a connection to the database
     * @throws SQLException
     * @throws java.lang.ClassNotFoundException
     */
    public static Connection getConnection() throws SQLException, ClassNotFoundException {
        Class.forName("org.apache.derby.jdbc.ClientDriver");
        //return DriverManager.getConnection(url + ":" + port + "/" + databaseName, username, password);
        return DriverManager.getConnection(url);
    }
    
    public static void main(String[] args) throws SQLException, ClassNotFoundException {
        Connection con = getConnection();
    }
    
}
