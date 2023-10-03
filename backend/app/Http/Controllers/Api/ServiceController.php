<?php
/**
 * Name: Yujia Xie 
 * Student ID: 104520641
 */
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\File;
use League\Csv\Reader;

class ServiceController extends Controller
{
    public function test()
    {
        return phpinfo();
    }
    //get all the services
    public function getServices()
    {
        try {
            $services = Service::get();
            return response()->json($services);
        } catch (\Exception $e) {

            // Include the error message in the response
            return response()->json(['status' => 'false', 'message' => $e->getMessage()], 500); // 500 Internal Server Error
        }
    }

    //search service by name
    public function searchService(Request $request)
    {
        try {
            // Validate the user input
            $this->validate($request, ['name' => 'required|string|max:100']);

            // If the validation passes, then get the service
            $name = $request->input('name');

            // Perform the search using Eloquent (parameter binding is automatic) and wildcard 
            $services = Service::where('name', 'like', '%' . $name . '%')->get();

            return response()->json($services);
        } catch (ValidationException $e) {
            // Handle validation errors and return a response with error messages
            return response()->json(['status' => 'false', 'message' => $e->errors()], 422); // 422 Unprocessable Entity
        } catch (\Exception $e) {

            // Handle other exceptions, such as database errors
            return response()->json(['status' => 'false', 'message' => $e->getMessage()], 500); // 500 Internal Server Error
        }
    }

    //delete service by id
    public function deleteService($id)
    {
        try {
            $service = Service::find($id);

            if (!$service) {
                // Return a 404 Not Found response if the service is not found
                return response()->json(['status' => 'false', 'message' => 'Service not found'], 404);
            }

            $service->delete();

            // Return a success response
            return response()->json(['status' => 'true', 'message' => 'Service deleted successfully']);
        } catch (\Exception $e) {
            // Handle unexpected exceptions and return an error response with the exception message
            return response()->json(['status' => 'false', 'message' => $e->getMessage()], 500);
        }
    }

    //add service 
    public function addService(Request $request)
    {
        try {
            // Validate the user input
            $this->validate($request, [
                'name' => 'required|string|max:100',
                'type' => 'required|string|max:10',
                'phone' => 'nullable|string|max:20',
                'email' => 'nullable|string|email|max:254',
                'address' => 'nullable|string|max:100',
                'url' => 'nullable|string|max:100'
            ]);

            // If the validation passes, then get the latitude and longitude of the service address
            $lat = null;
            $lng = null;
            if (!empty($request->input('address'))) {
                $address = $request->input('address') . ' Australia';
                $mapquest_api_key = 'Fi2Im2OdDqBHDfUapb3rjCsBKN6dalcO';
                $response = Http::get("https://www.mapquestapi.com/geocoding/v1/address?key=$mapquest_api_key&location=" . urlencode($address));
                if ($response->successful()) {
                    $data = $response->json();
                    if (!empty($data['results'][0]['locations'][0]['latLng']['lat']) && !empty($data['results'][0]['locations'][0]['latLng']['lng'])) {
                        $lat = $data['results'][0]['locations'][0]['latLng']['lat'];
                        $lng = $data['results'][0]['locations'][0]['latLng']['lng'];
                    }
                }
            }

            // Add the data to the database
            Service::create([
                'name' => $request->input('name'),
                'type' => $request->input('type'),
                'phone' => $request->input('phone'),
                'email' => $request->input('email'),
                'address' => $request->input('address'),
                'latitude' => $lat,
                'longitude' => $lng,
                'url' => $request->input('url')
            ]);

            return response()->json(['status' => 'true', 'message' => 'Service added successfully']);
        } catch (\Exception $e) {
            // Handle unexpected exceptions and return an error response with the exception message
            return response()->json(['status' => 'false', 'message' => $e->getMessage()], 500);
        }
    }

    //update service
    public function updateService(Request $request, $id)
    {
        try {
            $service = Service::find($id);

            if (!$service) {
                // Return a 404 Not Found response if the service is not found
                return response()->json(['status' => 'false', 'message' => 'Service not found'], 404);
            }

            // Validate the user input
            $this->validate($request, [
                'name' => 'required|string|max:100',
                'type' => 'required|string|max:10',
                'phone' => 'nullable|string|max:20',
                'email' => 'nullable|string|email|max:254',
                'address' => 'nullable|string|max:100',
                'url' => 'nullable|string|max:100'
            ]);

            // If the validation passes, then get the latitude and longitude of the service address
            $lat = null;
            $lng = null;
            if (!empty($request->input('address'))) {
                $address = $request->input('address') . ' Australia';
                $mapquest_api_key = 'Fi2Im2OdDqBHDfUapb3rjCsBKN6dalcO';
                $response = Http::get("https://www.mapquestapi.com/geocoding/v1/address?key=$mapquest_api_key&location=" . urlencode($address));
                if ($response->successful()) {
                    $data = $response->json();
                    if (!empty($data['results'][0]['locations'][0]['latLng']['lat']) && !empty($data['results'][0]['locations'][0]['latLng']['lng'])) {
                        $lat = $data['results'][0]['locations'][0]['latLng']['lat'];
                        $lng = $data['results'][0]['locations'][0]['latLng']['lng'];
                    }
                }
            }

            // Update the data
            Service::where('id', $id)->update([
                'name' => $request->input('name'),
                'type' => $request->input('type'),
                'phone' => $request->input('phone'),
                'email' => $request->input('email'),
                'address' => $request->input('address'),
                'latitude' => $lat,
                'longitude' => $lng,
                'url' => $request->input('url')
            ]);

            return response()->json(['status' => 'true', 'message' => 'Service updated successfully']);
        } catch (\Exception $e) {
            // Handle unexpected exceptions and return an error response with the exception message
            return response()->json(['status' => 'false', 'message' => $e->getMessage()], 500);
        }
    }


    //store all the data from Services.csv in the database
    public function storeServices()
    {
        // Define the path to the CSV file
        $csvFilePath = public_path('Services.csv');

        // Check if the CSV file exists
        if (file_exists($csvFilePath)) {
            try {
                // Create a CSV reader
                $csv = Reader::createFromPath($csvFilePath, 'r');
                $csv->setHeaderOffset(0); // Assumes the first row contains headers

                //If any errors occur during data insertion, the entire process can be rolled back, 
                //preventing partial data imports
                \DB::beginTransaction();

                foreach ($csv as $record) {
                    // Remove double quotes from address field
                    $address = str_replace('"', '', $record['Address']);
                    // Handle empty or missing latitude and longitude values
                    $latitude = empty($record['Latitude']) ? null : $record['Latitude'];
                    $longitude = empty($record['Longitude']) ? null : $record['Longitude'];

                    // Add the data to the database
                    Service::create([
                        'name' => $record['Name'],
                        'type' => $record['Service Type'],
                        'phone' => $record['Phone'],
                        'email' => $record['Email'],
                        'address' => $address,
                        'latitude' => $latitude,
                        'longitude' => $longitude,
                        'url' => $record['URL']
                    ]);
                }

                \DB::commit();

                return response()->json(['status' => 'true', 'message' => 'Services stored successfully']);
            } catch (\Exception $e) {
                \DB::rollBack();

                // Handle the exception and return an error message
                return response()->json(['status' => 'false', 'message' => $e->getMessage()]);
            }
        } else {
            // Handle the case where the file does not exist
            return response()->json(['status' => 'false', 'message' => 'CSV file not found']);
        }
    }


}