<!DOCTYPE html>
<html>
<head>
    <title>Test Result Certificate</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            
            height: 700px;
        }
        .certificate {
            margin: auto;
            color: white;
            background-color: #f2f2f2;
            justify-content: space-between;
            height: 600px;
            overflow: scroll;
            padding: 20px;
            border: 2px solid #193655;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center; /* Center content horizontally */
            justify-content: center; /* Center content vertically */
        }
        .header {
            color: #193655;
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .info{
            background-color: #193655;
            padding: 12px;
            height: 80%;
        }
    
        .footer {
            text-align: center;
            margin-top: 20px;
            font-style: italic;
            font-size: 16px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="header">Certificate of Test Result</div>
        
        <!-- Display user information and test result data in a single section -->
        <div class="info">
            <p><strong>Name:</strong> {{ $user->name }}</p>
            <p><strong>Email:</strong> {{ $user->email }}</p>
            <p><strong>Gender:</strong> {{ $user->gender }}</p>
            <p><strong>Nationality:</strong> {{ $user->nationality }}</p>
            <p><strong>Age:</strong> {{ $user->age }}</p>
            <p><strong>Postcode:</strong> {{ $user->postcode }}</p>
            <p><strong>Test Result:</strong> {{ $testResult->test_result }}</p>
            <p><strong>Test Date:</strong> {{ $testResult->test_date }}</p>
            <p><strong>Risk Exposure:</strong> {{ $testResult->risk_exposure }}</p>
            <p><strong>Reason for Test:</strong> {{ $testResult->reason_for_test }}</p>
        </div>

        <!-- Certificate footer -->
        <div class="footer">This certificate is issued on {{ $testResult->test_date }}</div>
    </div>
</body>
</html>
