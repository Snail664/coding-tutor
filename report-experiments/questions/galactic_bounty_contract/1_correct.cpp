#include <iostream>
#include <string>
#include <unordered_map>
#include <limits>
#include <vector>
#include <sstream>

using namespace std;

int calculateMinimumCost(const vector<string>& input) {
    unordered_map<string, int> crewCosts;

    for (const string& line : input) {
        istringstream iss(line);
        string crewName, costType;
        int costValue;

        // Read the crewName
        if (!getline(iss, crewName, ':')) {
            cerr << "Failed to parse crew name in line: " << line << endl;
            continue;
        }

        // Skip spaces after ':'
        iss >> ws;

        // Read the costType
        if (!(iss >> costType)) {
            cerr << "Failed to parse cost type in line: " << line << endl;
            continue;
        }

        // Read the costValue
        if (!(iss >> costValue)) {
            cerr << "Failed to parse cost value in line: " << line << endl;
            continue;
        }

        // Update the cost for the crew based on the costType
        if (costType == "Pilot" || costType == "Fuel" || costType == "Maintenance" || costType == "Docking" || costType == "Tax") {
            crewCosts[crewName] += costValue;
        } else if (costType == "Discount" || costType == "Rebate") {
            crewCosts[crewName] -= costValue;
        } else {
            cerr << "Unknown cost type: " << costType << " in line: " << line << endl;
        }
    }

    // Debugging: Print the crew costs
    for (const auto& [name, cost] : crewCosts) {
        cout << name << ": " << cost << endl;
    }

    // Find the minimum cost among all crews
    int minCost = numeric_limits<int>::max();
    for (const auto& [_, cost] : crewCosts) {
        if (cost < minCost) {
            minCost = cost;
        }
    }

    // If no valid costs were found, return 0 or handle it appropriately
    if (minCost == numeric_limits<int>::max()) {
        cout << "No valid costs found." << endl;
        return 0;
    }

    return minCost;
}