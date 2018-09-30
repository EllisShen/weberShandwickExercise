from flask import Flask, request, jsonify
from multiprocessing import Value
import time
import datetime
import pickle
import atexit

all_processes_counter = Value('i', 0)
app = Flask(__name__)
app.config["DEBUG"] = True

# status payload default data
status_payload = {
    'running_time': '',
    'called': 0,
    'first_called_date_time': '',
    'total_called': 0
}


def save_object(obj, filename):
    with open(filename, 'wb') as output:  # Overwrites any existing file.
        pickle.dump(obj, output, pickle.HIGHEST_PROTOCOL)


def exit_handler():
    # store current processes_counter to file
    save_object(all_processes_counter.value, 'total_called')


@app.route('/status', methods=['GET'])
def getStatus():
    # a) how long the application has been running
    status_payload['running_time'] = time.time() - start_time

    # b) the number of times this endpoint has been called
    # global single_process_counter
    global single_process_counter
    single_process_counter += 1
    status_payload['called'] = single_process_counter

    # c) the date/time at which this endpoint was first called
    # check if local date time file
    # file = open('first_called_date_time', 'rb')/
    try:
        with open('first_called_date_time', 'rb') as dateTimeFile:
            status_payload['first_called_date_time'] = pickle.load(
                dateTimeFile)
            pass
    except FileNotFoundError:
        # create
        now = datetime.datetime.now()
        save_object(now, 'first_called_date_time')
        status_payload['first_called_date_time'] = now
        pass

    # d) the number of times any of the server's endpoints have been called
    with all_processes_counter.get_lock():
        all_processes_counter.value += 1
    status_payload['total_called'] = all_processes_counter.value

    return jsonify(status_payload)


# get app start time
start_time = time.time()
# endpoint counter
single_process_counter = 0
# regiter exit handler
atexit.register(exit_handler)

if __name__ == "__main__":
    # for debug only
    app.run()
