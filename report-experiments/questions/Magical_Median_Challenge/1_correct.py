def solution(data):
    # Extract nums1 and nums2 from the input data (each is a list)
    nums1, nums2 = data

    # Implementation of findMedianSortedArrays
    n = len(nums1)
    m = len(nums2)
    i = 0
    j = 0
    m1 = 0
    m2 = 0

    # Merge up to the median position
    for count in range(0, (n + m) // 2 + 1):
        m2 = m1
        if i < n and j < m:
            if nums1[i] > nums2[j]:
                m1 = nums2[j]
                j += 1
            else:
                m1 = nums1[i]
                i += 1
        elif i < n:
            m1 = nums1[i]
            i += 1
        else:
            m1 = nums2[j]
            j += 1

    # Return result based on odd/even total length
    if (n + m) % 2 == 1:
        return int(float(m1))
    else:
        return int((float(m1) + float(m2)) / 2.0)

if __name__ == '__main__':
    data = [[1, 3], [2]]
    print(solution(data))