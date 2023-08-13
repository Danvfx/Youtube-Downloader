from colorama import init, Fore
import os
import time
import yt_dlp as youtube_dl  # Import yt_dlp instead of youtube_dl

init(autoreset=True)


def print_centered(text, width=None):
    if width is None:
        width = os.get_terminal_size().columns
    centered_text = text.center(width)
    print(centered_text)


def print_header_footer():
    width = os.get_terminal_size().columns
    header_footer = "=" * width
    print(Fore.RED + header_footer)


daniel_intro = """
========================================================================================================================
                                                Daniel
                                               Youtube
========================================================================================================================
"""

print(Fore.RED + daniel_intro)

# ----------------------------------------------------------------------------------------------------------

time.sleep(2)


def create_download_folder(folder_path):
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
        print(f'Created download folder: {folder_path}')


def on_progress_callback(data):
    if data['status'] == 'downloading':
        percentage = data['_percent_str']
        print(f"Downloaded: {percentage}")


def download_video(url, output_folder):
    ydl_opts = {
        'outtmpl': os.path.join(output_folder, '%(title)s.%(ext)s'),
        'progress_hooks': [on_progress_callback]
    }

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:  # Replace youtube_dl.YoutubeDL with youtube_dl.YoutubeDL
        ydl.download([url])


def main():
    print("Download 'Video' or 'Playlist'")
    print("Type 'Video' or 'Playlist'")
    time.sleep(0.5)
    choice = input('Enter:').lower()

    downloads_folder = os.path.join(os.path.expanduser("~"), "Downloads")
    youtube_downloads_folder = os.path.join(downloads_folder, "Youtube downloads")

    if not os.path.exists(youtube_downloads_folder):
        os.makedirs(youtube_downloads_folder)

    url = input("Please enter video or playlist URL: ")

    if choice == 'video':
        video_folder = os.path.join(youtube_downloads_folder, 'Videos')
        create_download_folder(video_folder)
        download_video(url, video_folder)
        print('Download Done')
    elif choice == 'playlist':
        playlist_folder = os.path.join(youtube_downloads_folder, 'Playlists')
        create_download_folder(playlist_folder)
        download_video(url, playlist_folder)
        print('Download Done')
    else:
        print("Invalid choice")


if __name__ == "__main__":
    main()
