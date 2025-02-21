#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <unordered_map>
#include <limits>

using namespace std;

// Function to manually parse JSON-like strings
vector<string> parseInput(string input) {
    vector<string> result;
    stringstream ss(input);
    string item;
    while (getline(ss, item, ',')) { // Split by comma
        result.push_back(item);
    }
    return result;
}

int solution(const vector<string>& data) {
    unordered_map<string, int> total_costs;
    vector<string> add_types = {"Pilot", "Fuel", "Maintenance", "Docking", "Tax"};
    vector<string> subtract_types = {"Discount", "Rebate"};

    for (const string& line : data) {
        stringstream ss(line);
        string crew, cost_type;
        int amount;
        char separator;

        if (!(ss >> crew >> separator) || separator != ':' || !(ss >> cost_type >> amount)) {
            continue; // Ignore invalid input
        }

        if (total_costs.find(crew) == total_costs.end()) {
            total_costs[crew] = 0;
        }

        if (find(add_types.begin(), add_types.end(), cost_type) != add_types.end()) {
            total_costs[crew] += amount;
        } else if (find(subtract_types.begin(), subtract_types.end(), cost_type) != subtract_types.end()) {
            total_costs[crew] -= amount;
        }
    }

    if (total_costs.empty()) return 0;

    int min_cost = numeric_limits<int>::max();
    for (const auto& entry : total_costs) {
        min_cost = min(min_cost, entry.second);
    }

    return min_cost;
}
