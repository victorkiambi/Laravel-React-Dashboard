<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;


class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }
    public function login (Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'email' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // all good so return the token
        return response()->json(compact('token'));
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'password'=> 'required',
            'email'=>'required',
            'name'=>'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $payload = [
            'password'=>Hash::make($request->password),
            'email'=>$request->email,
            'name' => $request->name,
            'auth_token'=> ''
        ];

        $user = new User($payload);
        $user->save();
        $token = JWTAuth::fromUser($user);

            if (!is_string($token))
                return response()->json([
                    'error'=>'Token generation failed'
                ], 201);

            $user = User::where('email', $request->email)->get()->first();
            $user->auth_token = $token; // update user token
            $user->save();

            $response = [
                'success'=>true,
                'data'=>$user
            ];
            return response()->json($response);
    }

}
