<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function show(User $user)
    {
        $chats = Chat::where(
            fn ($q) => $q->where('sender_id', Auth::id())->where('receiver_id', $user->id)
        )->orWhere(
            fn ($q) => $q->where('sender_id', $user->id)->where('receiver_id', Auth::id())
        )->get();

        // dd($chats);
        return inertia('Chats/Show', [
            'user' => $user,
            'chats' => $chats,
        ]);
    }

    public function store(Request $request, User $user)
    {
        $request->validate([
            'message' => ['required'],
        ]);

        $chat = Auth::user()->chats()->create([
            'receiver_id' => $user->id,
            'message' => $request->message,
        ]);

        broadcast(new MessageSent($chat))->toOthers();
        
        return back();
    }
}
