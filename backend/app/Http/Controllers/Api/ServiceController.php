<?php
/**
 * Name: Yujia Xie 
 * Student ID: 104520641
 */
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Service;

class ServiceController extends Controller
{
    public function test()
    {
        return phpinfo();
    }
    //get all the services
    public function getServices()
    {
        $services = Service::get();
        return response() -> json($services);
    }
    //search service by name
    public function searchService(Request $request)
    {
        //validate the user input
        $this -> validate($request, ['name' => 'required|string']);
        //if the validation passes, then get the service
        $name = $request -> input('name');
        //allow the user to input part of the name
        $name .= '%'.$name.'%';
        $service = Service::where('name', 'like', $name) -> get();
        return response() -> json($service);
    }
    //delete service by id
    public function deleteService(Request $request)
    {
        //validate the user input
        $this -> validate($request, ['id' => 'required|numeric']);
        //if the validation passes, then check if the service can be found in the database
        $id = $request -> input('id');
        $service = Service::find($id);
        if (!$service)
        {
            //return the error message if the service can not be found
            return response() -> json(['status' => 'false', 'message' => 'service not found']);
        }
        else
        {
            $service -> delete();
            return response() -> json(['status' => 'true', 'message' => 'service deleted sucessfully']);
        }
    }
    //add service (latitude and longitude will be generated by another script)
    public function addService(Request $request)
    {
        //validate the user input
        $this -> validate($request, [
            'name' => 'required|string',
            'type' => 'required|string',
            'phone' => 'string',
            'email' => 'string|email',
            'address' => 'string',
            'url' => 'string'
        ]);
        //if the validation passes, then get the latitude and longitude of the service address
        $lat = '';
        $lng = '';
        //add the data to the database
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
        return response() -> json(['status' => 'true', 'message' => 'service added sucessfully']);
    }
    
}
