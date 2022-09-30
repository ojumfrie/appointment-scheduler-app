# AppointmentScheduler


## SQL SERVER INSTALLATIONS (only if these softwares have not been installed yet)

- [ ] Install SQL Server Express
- [ ] Install SQL Server Management Studio (SSMS)

## DATABASE CREATION; TABLE CREATION; AND, RECORDS INSERTIONS

Open SQL Server Management Studio (SSMS):
- [ ] Login to SSMS using an existing account (just in case it is necessary, use "sa" account)

Create the database:
- [ ] Execute this SQL command
    ```
    CREATE DATABASE AppointmentSchedulerDB;
    ```

Change the active database:
- this is to ensure that the newly created database is the one active for the insertion of records that comes next

- [ ] Click on the dropdown (i.e., the Available Databases)
    - located above the Object Explorer window
- [ ] Select AppointmentSchedulerDB database from the list

## SQL LOGIN ACCOUNT CREATION

- UserID: john.doe
- Password: $ourc3f!tP4il

Object Explorer window:
- [ ] Expand "Security" folder
- [ ] Right-click on "Logins" folder
- [ ] Select "New Login..."

    - General tab
        - [ ] Type "john.doe" in the Login name field
        - [ ] Select "SQL server authentication"
        - [ ] Type in your password
        - [ ] Type in your confirm password
    - Server Roles tab
        - [ ] Tick the "sysadmin" checkbox
    - User Mapping tab
        - [ ] Tick the "AppointmentSchedulerDB" database checkbox
        - [ ] Tick the "db_owner" checkbox
    - Status tab
        - Permission to connect to database engine:
            - [ ] Be sure that "Grant" radiobutton is selected
        - Login:
            - [ ] Be sure that "Enabled" radiobutton is selected

- [ ] Click the OK button to save the account
- [ ] Logout from SSMS
- [ ] Restart the SQL Server service
    - [ ] Run services.msc
    - [ ] Find SQL Server service (e.g.: SQL Server (SQLEXPRESS))
    - [ ] Right-click on the service, and select Restart
- [ ] Login the newly created account into SSMS
- [ ] Ensure that the newly created account is able to login successfully
- [ ] <b>Note:</b> After testing the application and, all is good, remove this newly created account

## RESTORE REACTJS DEPENDENCIES (i.e., node_modules)

- [ ] Open command-prompt
- [ ] Change directory to the code solution folder - i.e.: AppointmentScheduler
    E.g.:
    ```
    cd\
    cd C:\[your path to the AppointmentScheduler.client folder]
    ```
- [ ] Execute NPM command:
    ```
    npm install
    ```

## EXECUTE Update-Database COMMAND IN PACKAGE MANAGER CONSOLE

- [ ] Open the AppointmentScheduler solution in Visual Studio IDE
- [ ] Go to Tools > Nuget Package Manager > Package Manager Console
- [ ] Execute the command right below
    - this updates the database by creating the corresponding tables based on the models created
    ```
    Update-Database
    ```

## RUN THE AppointmentScheduler SOLUTION

- [ ] Open the AppointmentScheduler solution in Visual Studio
- [ ] Update "Data Source" value in the SqlServer connection string that is found inside the "appsettings.json" file
- [ ] For the Web API:
    - [ ] Press CTRL+F5
- [ ] For the ReactJS:
    - [ ] Open command-prompt
    - [ ] Execute command: cd\
    - [ ] Execute command: cd C:\[your path to the AppointmentScheduler folder]
    - [ ] Execute command: cd AppointmentScheduler.client
    - [ ] Execute NPM command: npm start

## CONDUCT THE TESTING

Helpful info on the pages:

Coaches
- [ ] Coaches (the landing page)
    - contains the list of coaches
    - contains functionalities to edit and delete a record
    - contains functionality to view a coach's corresponding available schedules
    - contains functionality to view a coach's corresponding appointments
    - contains functionality to be able to register a new coach
- [ ] Create Coach
    - for registration of a new coach
    - contains validations on input dates
    - contains validations on other input fields
    - contains functionality to go back to the landing page
- [ ] Edit Coach
    - for editing an existing coach record
    - contains validations on input dates
    - contains validations on other input fields
    - contains functionality to go back to the landing page

Appointments
- [ ] Appointments
    - contains the list of appointments
    - contains functionalities to edit and delete a record
    - contains functionality to be able to set a new appointment
- [ ] Create Appointment
    - for creation/setting a new appointment
    - contains validations on input dates
    - contains validations on other input fields
    - contains functionality to go back to the appointments list
 - [ ] Edit Appointment
    - for editing an existing appointment record
    - contains validations on input dates
    - contains validations on other input fields
    - contains functionality to go back to the appointments list

Coach available schedules
- [ ] Schedules
    - contains the list of coaches available schedules
    - contains functionality to deactivate a schedule
    - contains functionality to be able to add a new schedule
- [ ] Create Schedule
    - for creation of a coach's new available schedule
    - contains validations on input dates
    - contains validations on other input fields
    - contains functionality to go back to the appointments list
